import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@utils/Utils";
import { MyCustomModal } from "@components/core/MyCustomModal/MyCustomModal";
import TwoFA from "@components/TwoFA/TwoFA";
import "./Login.css";
import CustomField from "@components/core/Input/CustomFieldProps";
import { FusionLogo } from "@assets/images";
import ReCAPTCHA from "react-google-recaptcha";
import CustomButton from "@components/core/CustomButton/CustomEditButton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AuthState, save } from "@redux/auth";
import { showLoader } from "@redux/spinnerLoader";

interface LoginFormValues {
  userName: string;
  password: string;
  captcha: string;
  rememberMe?: boolean;
  email?: string;
}

const Login = () => {
  const siteKey = "6LeIG58qAAAAALJlNZlkWtdLS0BjXC02VMKDq1_o";
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const dispatch = useDispatch();

  const initialValues: LoginFormValues = {
    userName: "",
    password: "",
    captcha: "",
  };

  const handleSubmit = (values: LoginFormValues) => {
    console.log("Form Submitted with values:", values);
    setModalShow(true);
    dispatch(showLoader(true))
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter the User Name"),
    password: Yup.string()
      .min(1, "Password must be at least 8 characters")
      .required("Please enter the password"),
    captcha: Yup.string(),
  });
  const userLoginFunc = (values: LoginFormValues) => {
    //here we call cognito api for below data...
    const authData: AuthState = {
      accessToken: "fusionFund",
      accessTokenExpiry: 3600,
      refreshToken: "refresh-fusionFund",
      refreshTokenExpiry: 12000,
      name: "Richard",
      email: values.email,
      merchantID: "Rich1234",
      twoFaPref: "mobile",
    };
    dispatch(save(authData));
    toast.success("Login success", { theme: "colored" });
    navigate(ROUTES.DASHBOARD);
  };
  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          touched,
          errors,
          handleSubmit,
          isValid,
          dirty,
          setFieldValue,
          values,
        }) => (
          <div className="rounded-lg p-4 p-md-5 w-100 w-md-50">
            <Row className="w-100 h-100 ms-0">
              {/* Left Side: Image */}
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-center align-items-center flex-column flex-md-row"
              >
                <img
                  src={FusionLogo}
                  alt="Side Graphic"
                  className="login-logo"
                />
              </Col>

              {/* Right Side: Form */}
              <Col
                xs={12}
                md={6}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="login-form-container">
                  <div className="login-form">
                    <h2 className="text-start text-lg font-semibold mb-3">
                      Login
                    </h2>

                    <Form>
                      {/* Email Field */}
                      <CustomField
                        type="text"
                        name="userName"
                        label="User Name"
                        placeholder="JonhDoe123"
                        touched={touched}
                        errors={errors}
                        fieldTextSize="fieldTextSize"
                      />

                      {/* Password Field */}
                      <CustomField
                        type="password"
                        name="password"
                        label="Password"
                        doNotCopyPaste={true}
                        placeholder="At least 8 characters"
                        touched={touched}
                        errors={errors}
                        fieldTextSize="fieldTextSize"
                      />

                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="form-check">
                            <Field
                              type="checkbox"
                              name={"rememberMe"}
                              id={"rememberMe"}
                              className={`form-check-input rememberCheckBox`}
                            />
                            <label
                              htmlFor={"rememberMe"}
                              className="form-check-label"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>

                        <label className="forgotPasswordButton">
                          Forgot Password?
                        </label>
                      </div>

                      <hr className="my-3" />

                      {/* Security Check Field */}
                      <div className="captch_box">
                        <ReCAPTCHA
                          sitekey={siteKey}
                          onChange={(token) =>
                            setFieldValue("captcha", token || "")
                          }
                        />
                        {touched.captcha && errors.captcha && (
                          <div className="error-text">{errors.captcha}</div>
                        )}
                      </div>
                      {/* Submit Button */}
                      <div className="d-flex justify-content-center">
                        <div className="d-grid col-md-5 my-2">
                          <CustomButton
                            onSelect={
                              isValid && dirty ? () => {} : handleSubmit
                            }
                            title="Continue"
                            containFill={true}
                            buttonDisabled={!isValid || !dirty}
                          />
                        </div>
                      </div>

                      {/* Signup Link */}
                      <div className="d-flex justify-content-center align-items-center signupLinkText mb-0 mt-2">
                        <span>
                          Don't have an account?{" "}
                          <Link to={ROUTES.SIGNUP} className="signup-link">
                            Sign up
                          </Link>
                        </span>
                      </div>
                    </Form>
                  </div>
                </div>
              </Col>
            </Row>
            <MyCustomModal show={modalShow} onHide={() => setModalShow(false)}>
              <TwoFA
                onHide={() => setModalShow(false)}
                firstTimeTriggerOtp={true}
                onSuccess={() => {
                  userLoginFunc(values);
                }}
              />
            </MyCustomModal>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
