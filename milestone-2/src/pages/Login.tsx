import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const initialValues = {
        name: name,
        password: password
    }

    const navigate = useNavigate();

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const loginSchema = Yup.object().shape({
        name: Yup.string().required("Required"),

        password: Yup.string().required("Required"),
    });

    const handleLogin = (name: string, password: string) => {
        if (name === localStorage.name && password === localStorage.password) {
            localStorage.setItem('token', 'true');
            alert("Login successful");
            navigate('/dashboard');
        } else {
            alert("Login failed");
        }
    }

    return (
        <section className="bg-yellow-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <a onClick={() => {navigate('/')}} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 cursor-pointer">
                    <img className="w-max h-8 mr-2" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo" />
                    Pokedex
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to Pokedex
                        </h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={loginSchema}
                            onSubmit={(values) => {
                                handleLogin(values.name, values.password)
                            }}
                        >
                            <Form className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900">
                                            Name:
                                        </label>
                                    <Field type="text" id="name" name="name" placeholder="Enter your name" values={onChangeName}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                    <ErrorMessage name="name" component="div" />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password:
                                        </label>
                                    <Field type="password" id="password" name="password" placeholder="••••••••" values={onChangePassword}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                                <button type="submit"
                                    className="w-full text-white bg-blue-700 bg-primary-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        Sign in
                                    </button>
                                <p className="text-sm font-light text-gray-500">
                                    Don’t have an account yet? <a onClick={() => navigate('/register')} className="cursor-pointer font-medium text-primary-600 hover:underline">Register</a>
                                </p>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;