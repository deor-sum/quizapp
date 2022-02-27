import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUserAlt, FaKey } from "react-icons/fa";
import axios from "axios";
// Validate Login Form Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

class Login extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  componentDidMount() {
    this.requestGetUsers();
  }

  requestGetUsers = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      this.setState({ users: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  requestPostLogin = async (data) => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        data
      );
      this.setState({ users: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  //Login Logic
  login = (values, { setSubmitting }) => {
    //axios.post("https://jsonplaceholder.typicode.com/users");
    this.requestPostLogin(values);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
      setSubmitting(false);
    }, 2000);
  };

  render() {
    return (
      <div className="h-screen w-full bg-white flex justify-center items-center flex-col">
        <div className="bg-slate-800 w-8/12 sm:w-6/12 md:w-3/12 h-auto px-12 py-12 flex-initial  content-center items-center flex-col shadow-md">
          <h1 className="text-4xl text-white pb-8 text-center">Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={this.login}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form s>
                <div className="relative">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`form-input bg-white text-sm h-8 my-4 w-full block px-8 py-4 border  shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${
                      errors.email ? "border-pink-600" : "border-slate-300"
                    }`}
                  />
                  <FaUserAlt className="relative bottom-10 left-2" />
                </div>

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input bg-white text-sm h-8 my-4 w-full block px-8 py-4 border border-slate-300 shadow-sm placeholder-slate-400  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
                <FaKey className="relative bottom-10 left-2" />
                {errors.password ? <span>{errors.password}</span> : null}
                <button
                  className="bg-sky-600 hover:bg-sky-700 block px-10 py-5 w-full my-5 h-16"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg
                      class="animate-spin h-full w-6 text-white mx-auto "
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <p className="text-white text-xl font-bold ">Login </p>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div>
          <ul>
            {this.state.users.length === 0 ? (
              <div>Loading...</div>
            ) : (
              this.state.users.map((user, i) => {
                return <li key={i}>{user.name}</li>;
              })
            )}
          </ul>
        </div>
        <footer className="absolute bottom-4">
          <p>Copyright @ 2022</p>
        </footer>
      </div>
    );
  }
}

export default Login;
