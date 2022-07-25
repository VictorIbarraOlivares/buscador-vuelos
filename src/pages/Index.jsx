import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import AsyncSelectLocation from '../components/AsyncSelectLocation';
import DateInput from '../components/DateInput';
import { getToken } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchFlights, isLoadingResultsFlights } from "../redux/slices/results";
import dayjs from 'dayjs';
import { locationsOptions, formatDate, formatDateToAPI } from '../utils/helpers';

const newSearchSchema = Yup.object({
  origen: Yup.string().min(3, "Debe contener al menos 3 caracteres").required('Requerido'),
  destino: Yup.string().min(3, "Debe contener al menos 3 caracteres").required('Requerido')
  .notOneOf([Yup.ref('origen')], "El destino debe ser distinto al origen"),
  ida: Yup.date().required('Requerido'),
  regreso: Yup.date().min(
    Yup.ref('ida'),
    "La fecha de regreso debe ser posterior a la fecha de ida"
  ),
  adultos: Yup.number().max(8),
  boys: Yup.number().when("adultos", adultos => {
    return Yup.number().max(9 - adultos, "los pasajeros no pueden ser más de 9");
  })
});

const Index = () => {
  const isLoading = useSelector(isLoadingResultsFlights);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [error, setError] = useState({});

  const handleSubmit = (values) => {
    // para el layout
    const origen = locationsOptions.find(location => location.value === values.origen);
    const destino = locationsOptions.find(location => location.value === values.destino);
    const ida = formatDate(values.ida);
    const regreso = values.regreso !== '' ? formatDate(values.regreso) : '';

    // para la api
    values.ida = formatDateToAPI(values.ida);
    values.regreso = values.regreso !== '' ? formatDateToAPI(values.regreso) : '';

    dispatch(searchFlights(values, token));
    navigate('/flight-offers', {
      state: {
        origen: origen.label,
        destino: destino.label,
        ida: ida,
        regreso: regreso,
        adultos: values.adultos,
        boys: values.boys
      }
    });
  }

  const getTokenAmadeus = async () => {
    try {
      const response = await getToken();
      setToken(response?.data?.access_token);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    const getTokenHelp = () => {
      getTokenAmadeus();
    }
    getTokenHelp();
  }, []);

  return (
    <div className='h-screen md:h-screen bg-indigo-100 p-1 md:p-10 flex items-center justify-center'>
    
    <div className=' bg-white px-4 py-5 sm:px-6 m-4 sm:m-4 rounded-lg shadow-lg shadow-indigo-600'>
      <Formik initialValues={{
        origen: '',
        destino: '',
        ida: '',
        regreso: '',
        adultos: 1,
        boys: 0
      }}
        onSubmit={handleSubmit}
        validationSchema={newSearchSchema}
      >
        {(formik) => (
          <Form className="content-center">
            <div className="">
              <div className="pt-2">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-indigo-700">Búsqueda de vuelos</h3>
                  <p className="mt-1 text-sm text-gray-500">Encuentra el vuelo que necesitas</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-8">
                  <div className="sm:col-span-4">
                    <label htmlFor="origen" className="block text-sm font-medium text-gray-700">
                      Origen *
                    </label>
                    <div className="mt-1">
                      <AsyncSelectLocation
                        onChange={value => formik.setFieldValue('origen', value?.value ? value.value : '')}
                        className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md " + ((formik.touched.origen && formik.errors.origen) ? 'border-red-400 ring-red-400' : '')}
                      />
                      <ErrorMessage name="origen" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
                      Destino *
                    </label>
                    <div className="mt-1">
                      <AsyncSelectLocation
                        onChange={value => formik.setFieldValue('destino', value?.value ? value.value : '')}
                        className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md " + ((formik.touched.destino && formik.errors.destino) ? 'border-red-400 ring-red-400' : '')}
                      />
                      <ErrorMessage name="destino" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>

                  <div className="sm:col-span-2 z-0">
                    <label htmlFor="ida" className="block text-sm font-medium text-gray-700">
                      Ida *
                    </label>
                    <div className="mt-1">
                      <DateInput
                        onChange={value => formik.setFieldValue('ida', value ? value : '')}
                        placeholder='Seleccione fecha'
                        min={dayjs(new Date()).startOf('day').add(1, 'days').toDate()}
                      />
                      <ErrorMessage name="ida" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>

                  <div className="sm:col-span-2 z-0">
                    <label htmlFor="regreso" className="block text-sm font-medium text-gray-700">
                      Regreso
                    </label>
                    <div className="mt-1">
                      <DateInput
                        onChange={value => formik.setFieldValue('regreso', value ? value : '')}
                        min={dayjs(new Date()).startOf('day').add(2, 'days').toDate()}
                        disabled={formik.values.ida === '' && true}
                        placeholder='Seleccione fecha'
                      />
                      <ErrorMessage name="regreso" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="adultos" className="block text-sm font-medium text-gray-700">
                      Adultos *
                    </label>
                    <div className="mt-1">
                      <Field
                        as="select"
                        id="adultos"
                        name="adultos"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </Field>
                    </div>
                    <ErrorMessage name="adultos" render={msg => <ErrorInput msg={msg} />} />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="boys" className="block text-sm font-medium text-gray-700">
                      Niños
                    </label>
                    <div className="mt-1">
                      <Field
                        as="select"
                        id="boys"
                        name="boys"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </Field>
                      <ErrorMessage name="boys" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={"ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + ((isLoading) ? "cursor-wait" : "")}
                >
                  Buscar
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  )
}

const ErrorInput = ({ msg }) => {
  return (
    <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>{msg}</span>
  )
}
export default Index;
