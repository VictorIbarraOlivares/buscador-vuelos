import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import AsyncSelectLocation from '../components/AsyncSelectLocation';
import DateInput from '../components/DateInput';
import { useState, useEffect } from 'react';
import { getToken, apiCall } from '../api';
import { useDispatch } from 'react-redux';
import { searchFlights } from '../redux/actions/results';


const newSearchSchema = Yup.object({
  origen: Yup.string().min(3, "Debe contener al menos 3 caracteres").required('Requerido'),
  destino: Yup.string().min(3, "Debe contener al menos 3 caracteres").required('Requerido'),
  ida: Yup.string().required('Requerido'),
  regreso: Yup.string(),
});

const Index = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [token, setToken] = useState('');

  const handleSubmit = async (values) => {
    try {
      
      dispatch(searchFlights(values, token));

      setIsLoading(true);
      const response = await apiCall(
        `v2/shopping/flight-offers?originLocationCode=${values.origen}&destinationLocationCode=${values.destino}&departureDate=2022-11-01&adults=${values.adultos}&max=3&currencyCode=EUR`,
        token
      );
      setSearchResults(response?.data);

      console.log('searchResults', searchResults);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
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
    getTokenAmadeus();
  },[]);
  
  return (
    <div className='bg-white px-4 py-5 sm:px-6'>
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
          <Form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Busqueda de vuelos</h3>
                  <p className="mt-1 text-sm text-gray-500">Complete los campos necesarios para realizar la busqueda</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="origen" className="block text-sm font-medium text-gray-700">
                      Origen (*)
                    </label>
                    <div className="mt-1">
                      <AsyncSelectLocation
                        onChange={value => formik.setFieldValue('origen', value?.value ? value.value : '')}
                        className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md " + ((formik.touched.origen && formik.errors.origen) ? 'border-red-400 ring-red-400' : '')}
                      />
                      <ErrorMessage name="origen" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="destino" className="block text-sm font-medium text-gray-700">
                      Destino (*)
                    </label>
                    <div className="mt-1">
                      <AsyncSelectLocation
                        onChange={value => formik.setFieldValue('destino', value?.value ? value.value : '')}
                        className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md " + ((formik.touched.destino && formik.errors.destino) ? 'border-red-400 ring-red-400' : '')}
                      />
                      <ErrorMessage name="destino" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="ida" className="block text-sm font-medium text-gray-700">
                      Ida (*)
                    </label>
                    <div className="mt-1">
                      <DateInput
                        onChange={value => formik.setFieldValue('ida', value ? value : '')}
                        placeholder='Seleccione fecha de ida'
                      />
                      <ErrorMessage name="ida" render={msg => <ErrorInput msg={msg} />} />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="regreso" className="block text-sm font-medium text-gray-700">
                      Regreso
                    </label>
                    <div className="mt-1">
                      <DateInput
                        onChange={value => formik.setFieldValue('regreso', value ? value : '')}
                        placeholder='Seleccione fecha de regreso'
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="adultos" className="block text-sm font-medium text-gray-700">
                      Adultos (*)
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
                  </div>

                  <div className="sm:col-span-3">
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
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-5">
              <div className="flex justify-end">
              {error && <span className="text-red-500 my-auto mr-4 font-medium">Ha ocurrido un error</span>}
                <button
                  type="reset"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Borrar
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={"ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " + ((isLoading) ? "cursor-wait" : "")}
                >
                  {isLoading ? 'Buscando ...': 'Buscar'}
                  {/* Buscar */}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

const ErrorInput = ({ msg }) => {
  return (
    <span className='flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1'>{msg}</span>
  )
}
export default Index;