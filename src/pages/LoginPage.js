import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { json, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().required(" Email is Required"),
  password: Yup.string().required("Password is Required"),
});

const LoginPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  // const [input, setInput] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [isInvalid, setIsInvalid] = useState({ email: false, password: false });
  // const handleInputChange = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };
  // // const handleValidation(input){
  // //     setInput({...isInvalid,[input.email]:input.email===''? true:''})
  // // }
  // const handleLogin = (e) => {
  //   // e.preventDefault();
  //   // handleValidation(input);
  //   console.log(input, "in");
  //   if (input.email == "admin@gmail.com" && input.password == "1234") {
  //     toast({
  //       title: "Successfully loged in",
  //       description: "You are authorised user",
  //       status: "success",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //     return redirect("/sales-order");
  //   } else {
  //     toast({
  //       title: "Unauthorised User.",
  //       description: "You are unauthorised user .",
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // };
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });
  // console.log(formik, "fmik");
  // const isError = input === "";
  // function validateEmail(value) {
  //   let error;
  //   if (!value) {
  //     error = "Email is required";
  //   }

  //   return error;
  // }
  // function validatePassword(value) {
  //   let error;
  //   if (!value) {
  //     error = "Password is required";
  //   }

  //   return error;
  // }

  return (
    // <>
    //   <Box
    //     w={["full", "md"]}
    //     p={[8, 10]}
    //     mt={[20, "10vh"]}
    //     mx="auto"
    //     border={["none", "1px"]}
    //     borderColor={["", "gray.300"]}
    //     borderRadius={10}
    //   >
    //     <Form onSubmit={formik.handleSubmit}>
    //       <VStack spacing={4} align="flex-start" w="full">
    //         <VStack
    //           spacing={1}
    //           align={["flex-start", "center"]}
    //           w="full"
    //           mb={3}
    //         >
    //           <Heading>Login</Heading>
    //           <Text> Enter Your E-mail and Password to login</Text>
    //         </VStack>
    //       </VStack>
    //       <FormControl isRequired>
    //         <FormLabel>E-mail Address</FormLabel>
    //         <Input
    //           rounded="none"
    //           variant="filled"
    //           type="email"
    //           name="email"
    //           placeholder="eg- admin@gmail.com"
    //           value={input.email}
    //           onChange={(e) => handleInputChange(e)}
    //         />
    //         {!isInvalid ? (
    //           ""
    //         ) : (
    //           <FormErrorMessage>Email is required.</FormErrorMessage>
    //         )}
    //       </FormControl>
    //       <FormControl isRequired>
    //         <FormLabel>Password</FormLabel>
    //         <Input
    //           rounded="none"
    //           variant="filled"
    //           type="password"
    //           name="password"
    //           value={input.password}
    //           placeholder="eg- 1234"
    //           onChange={(e) => handleInputChange(e)}
    //         />
    //         {!isInvalid ? (
    //           ""
    //         ) : (
    //           <FormErrorMessage>Password is required.</FormErrorMessage>
    //         )}
    //       </FormControl>
    //       <HStack w="full" justify={"space-between"} mt={3}>
    //         <Checkbox colorScheme="teal">Remember me</Checkbox>
    //         <Button variant="link" colorScheme="blue">
    //           Forgot Password ?
    //         </Button>
    //       </HStack>
    //       <Button
    //         rounded="none"
    //         backgroundColor={"#3DA288"}
    //         color={"white"}
    //         w="full"
    //         mt={3}
    //         alignSelf="end"
    //         _hover={{ bg: "green.300" }}
    //         type="submit"
    //         onClick={(e) => handleLogin(e)}
    //       >
    //         Login
    //       </Button>
    //     </Form>
    //   </Box>
    // </>
    <>
      <Box
        w={["full", "md"]}
        p={[8, 10]}
        mt={[20, "10vh"]}
        mx="auto"
        border={["none", "1px"]}
        borderColor={["", "gray.300"]}
        borderRadius={10}
      >
        <Formik
          initialValues={{ email: "", password: "", reminder: false }}
          validationSchema={loginSchema}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
            if (
              values.email === "admin@gmail.com" ||
              values.password === "123456"
            ) {
              toast({
                title: "Successfully loged in",
                description: "You are authorised user",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              navigate("/sales-order");
            } else {
              toast({
                title: "Unauthorized access",
                description: "You have not access ",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   actions.setSubmitting(false);
            // }, 1000);
            console.log(values, "vals");
          }}
        >
          {(props) => (
            <Form>
              <VStack spacing={4} align="flex-start" w="full">
                //{" "}
                <VStack
                  spacing={1}
                  align={["flex-start", "center"]}
                  w="full"
                  mb={3}
                >
                  <Heading color="teal">Login</Heading>
                  <Text> Enter Your E-mail and Password to login</Text>
                </VStack>
              </VStack>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input {...field} placeholder="Enter Email" type="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter Password"
                      type="password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <HStack w="full" justify={"space-between"} mt={3}>
                <Checkbox colorScheme="teal">Remember me</Checkbox>{" "}
                <Button variant="link" colorScheme="blue">
                  Forgot Password ?{" "}
                </Button>{" "}
              </HStack>
              <Flex justifyContent="center">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>

        <Text mt={4}> Demo admin - email : admin@gmail.com</Text>
        <Text>password: 123456</Text>
      </Box>
    </>
  );
};

export default LoginPage;
