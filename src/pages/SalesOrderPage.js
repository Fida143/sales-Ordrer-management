import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  HStack,
  useColorMode,
  useDisclosure,
  Text,
  Badge,
  VStack,
  FormLabel,
  FormControl,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Multiselect } from "multiselect-react-dropdown";
import { product } from "../data/product";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

const addSalesOrdSchema = Yup.object({
  // invoice_date: Yup.string().required(" Invoice Date  is Required"),
  // invoice_number: Yup.string().required("Invoice Number is Required"),
  // customer: Yup.string().required("Customer is Required"),
});
const SalesOrderPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();
  const [products, setProducts] = useState(product);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const toast = useToast();
  const productOptions = [
    { value: "productOption1", label: "ProductOption1" },
    { value: "productOption2", label: "ProductOption2" },
    { value: "productOption3", label: "ProductOption3" },
  ];
  const CustomerOptions = [
    { value: "Customer1", label: "Customer1" },
    { value: "Customer2", label: "Customer2" },
    { value: "Customer3", label: "Customer3" },
  ];
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [active, setActive] = useState(false);

  const [skuItems, setSkuItems] = useState({
    selling_rate: "",
    total_items: "",
  });

  console.log(products, "pr");
  // const formik = useFormik({
  //   initialValues: {
  //     invoice_number: "",
  //     invoice_date: "",
  //     customer: "",
  //     products: "",
  //     is_paid: false,
  //   },
  //   onSubmit: (values, actions) => {
  //     alert(JSON.stringify(values, null, 5));
  //     actions.resetForm();
  //     console.log(formik, "fm");
  //   },
  // });

  //  active tab && completed

  const activeSales = () => {
    let allProducts = [...products];
    setActive(true);
    setFilteredProducts(allProducts.filter((p) => p.paid == true));
  };
  const completedSales = () => {
    let allProducts = [...products];
    setFilteredProducts(products.filter((p) => p.paid !== true));
    setActive(true);
  };

  useEffect(() => {
    setActive(false);
    activeSales();
  }, [products]);

  //  Create Iso date format

  let currectDateTime = new Date();

  let newDateFormat = currectDateTime.toISOString();

  return (
    <>
      <Container maxW="8xl">
        <Button
          onClick={toggleColorMode}
          textAlign="end"
          m={3}
          colorScheme="teal"
          variant="outline"
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <HStack display="flex" justifyContent="space-between" mx={3}>
          <span>
            <Button
              colorScheme="teal"
              variant="outline"
              w="min-content"
              m={3}
              ml={0}
              onClick={activeSales}
            >
              Active Sales Order
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={completedSales}
            >
              Completed Sales Order
            </Button>
          </span>
          <Button colorScheme="teal" variant="outline" onClick={onOpen}>
            {" "}
            + Sales Order
          </Button>
        </HStack>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Customer Name</Th>
                <Th isNumeric>Price(₹)</Th>
                <Th>Last Modified</Th>
                <Th>Edit/View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {(active ? filteredProducts : products)
                // .filter((p) => p.paid == true)
                .map((product) => {
                  return (
                    <Tr key={product.id}>
                      <Td>{product.id}</Td>
                      <Td display="flex" alignItems="center" gap={2}>
                        <span>
                          <RxAvatar />
                        </span>
                        <span>{product.name}</span>
                        <Badge colorScheme="gray" fontWeight={100}>
                          ap {product.owner}
                        </Badge>
                      </Td>
                      <Td isNumeric> (₹){product.sku[0].selling_price}</Td>
                      <Td>
                        {product.updated_on.split("T")[0]}

                        {"  " + product.updated_on.split("T")[1].split(".")[0]}
                      </Td>
                      <Td
                        onClick={onEditModalOpen}
                        cursor="pointer"
                        pointerEvents={`${
                          filteredProducts[0].paid ? "pointer" : " none"
                        }`}
                      >
                        ...
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
        <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Formik
              initialValues={{
                invoice_number: "",
                invoice_date: "",
                customer: selectedCustomer.value,
                selling_rate: skuItems.selling_rate,
                total_items: skuItems.total_items,
                products: selectedProduct,
                is_paid: false,
              }}
              validationSchema={addSalesOrdSchema}
              onSubmit={(values, actions) => {
                alert(JSON.stringify(values, null, 3));
                // setProducts([...products, { ...values }]);
                setProducts([
                  ...products,
                  {
                    id: products[products.length - 1].id + 1,
                    display_id: 8,
                    owner: 1080,
                    name: selectedCustomer.value,
                    category: "The god of War",
                    characteristics: "New Product Characteristics",
                    features: "",
                    brand: "New Product Brand",
                    paid: values.is_paid,
                    sku: [
                      {
                        id: 248,
                        selling_price: values.selling_rate,
                        max_retail_price: 44,
                        amount: 33,
                        unit: "kg",
                        quantity_in_inventory: 0,
                        product: 209,
                      },
                      {
                        id: 247,
                        selling_price: 32,
                        max_retail_price: 32,
                        amount: 33,
                        unit: "kg",
                        quantity_in_inventory: 0,
                        product: 209,
                      },
                      {
                        id: 246,
                        selling_price: 23,
                        max_retail_price: 21,
                        amount: 22,
                        unit: "kg",
                        quantity_in_inventory: 1,
                        product: 209,
                      },
                    ],

                    updated_on: `${newDateFormat}`,
                    adding_date: "2024-05-24T12:46:41.995828Z",
                  },
                ]);
                actions.resetForm();
                toast({
                  title: "Successfully Added Sales Order",
                  description: "New Sales Order is created .",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                onClose();
              }}
              // alert(JSON.stringify(values, null, 2));
              //   setTimeout(() => {
              //     alert(JSON.stringify(values, null, 2));
              //     actions.setSubmitting(false);
              //   }, 1000);
              //   actions.resetForm();
              //   console.log(values, "vals");
              // }}
            >
              {(props) => (
                <Form>
                  <ModalHeader textTransform="uppercase">
                    {" "}
                    <Badge
                      colorScheme="green"
                      rounded={28}
                      p={2}
                      mx="auto"
                      display="block"
                      w="fit-content"
                    >
                      Sales Order Form{" "}
                    </Badge>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack spacing={4} align="flex-start" w="full">
                      <HStack
                        display="flex"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Field name="invoice_number">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.invoice_number &&
                                form.touched.invoice_number
                              }
                            >
                              <FormLabel>Invoice Number</FormLabel>
                              <Input
                                {...field}
                                placeholder="Enter invoice number"
                                type="text"
                              />
                              <FormErrorMessage>
                                {form.errors.invoice_number}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="invoice_date">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.invoice_date &&
                                form.touched.invoice_date
                              }
                            >
                              <FormLabel>Invoice Date</FormLabel>
                              <Input
                                {...field}
                                placeholder="Enter invoice Date"
                                type="date"
                              />
                              <FormErrorMessage>
                                {form.errors.invoice_date}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </HStack>
                      {/* <FormControl isRequired>
                        <FormLabel>Customers</FormLabel>
                        <Select
                          placeholder="Select a Customer"
                          name="customer"
                          onChange={formik.handleChange}
                          value={formik.values.customer}
                        >
                          <option>Customer1</option>
                          <option>Customer2</option>
                          <option>Customer3</option>
                        </Select>
                      </FormControl> */}
                      <Field name="customer">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.customer && form.touched.customer
                            }
                          >
                            <FormLabel>Customer</FormLabel>
                            <Select
                              {...field}
                              placeholder="Select a Customer"
                              value={selectedCustomer}
                              options={CustomerOptions}
                              onChange={(selectedCustomer) =>
                                setSelectedCustomer(selectedCustomer)
                              }
                            />
                            <FormErrorMessage>
                              {form.errors.customer}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="products">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.products && form.touched.products
                            }
                          >
                            <FormLabel>All Products</FormLabel>
                            <Select
                              placeholder="Select a Product"
                              options={productOptions}
                              displayValue="productOption"
                              w="full"
                              value={selectedProduct}
                              onChange={(e) => setSelectedProduct(e)}
                              isMulti={true}
                            />
                            <FormErrorMessage>
                              {form.errors.products}
                            </FormErrorMessage>
                            {selectedProduct.map((prod, i) => {
                              return (
                                <Accordion allowMultiple mt={3} key={i}>
                                  <AccordionItem>
                                    <h2>
                                      <AccordionButton>
                                        <Box
                                          as="span"
                                          flex="1"
                                          textAlign="left"
                                        >
                                          {prod.value}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                      <Box
                                        w={"full"}
                                        px={6}
                                        py={4}
                                        border={["none", "1px"]}
                                        borderColor={["", "gray.300"]}
                                        borderRadius={10}
                                      >
                                        <Flex justifyContent="space-between">
                                          <Text>{i + 1} SKU 3 (5 kg)</Text>
                                          {/* <Text>{`${i + 1}. SKU ${
                                            product.sku.id
                                          } (${
                                            product.sku.quantity_in_inventory
                                          } ${product.sku.unit} )`}</Text> */}
                                          <Badge
                                            colorScheme="gray"
                                            fontWeight={500}
                                            p={1}
                                            textTransform="none"
                                          >
                                            Rate ₹
                                            {` ${props.values.selling_rate}`}
                                          </Badge>
                                        </Flex>
                                        <Flex
                                          justifyContent="space-between"
                                          gap={2}
                                        >
                                          <Field name="selling_rate">
                                            {({ field, form }) => (
                                              <FormControl
                                                isInvalid={
                                                  form.errors.selling_rate &&
                                                  form.touched.selling_rate
                                                }
                                              >
                                                <FormLabel>
                                                  Selling Rate
                                                </FormLabel>
                                                <Input
                                                  {...field}
                                                  placeholder="Enter Selling Rate"
                                                  type="number"
                                                  min={0}
                                                />
                                                <FormErrorMessage>
                                                  {form.errors.selling_rate}
                                                </FormErrorMessage>
                                              </FormControl>
                                            )}
                                          </Field>
                                          <Field name="total_items">
                                            {({ field, form }) => (
                                              <FormControl
                                                isInvalid={
                                                  form.errors.total_items &&
                                                  form.touched.total_items
                                                }
                                              >
                                                <FormLabel>
                                                  Total Items
                                                </FormLabel>
                                                <Input
                                                  {...field}
                                                  placeholder="Enter Total Items"
                                                  type="number"
                                                  min={0}
                                                />
                                                <FormErrorMessage>
                                                  {form.errors.total_items}
                                                </FormErrorMessage>
                                              </FormControl>
                                            )}
                                          </Field>
                                        </Flex>
                                      </Box>
                                    </AccordionPanel>
                                  </AccordionItem>
                                </Accordion>
                              );
                            })}
                          </FormControl>
                        )}
                      </Field>

                      {/* <FormControl isRequired>
                        <FormLabel>All Products</FormLabel>
                        <Multiselect
                          placeholder="Select a Product"
                          options={options}
                          displayValue="productOption"
                          w="full"
                          showArrow="true"
                          name="products"
                          onChange={formik.handleChange}
                          value={formik.values.products}
                        />
                        <Accordion allowMultiple mt={3}>
                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <Box as="span" flex="1" textAlign="left">
                                  Section 1 title
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </FormControl> */}
                      <HStack w="full" justify={"space-between"} mt={3}>
                        <Checkbox
                          name="is_paid"
                          colorScheme="green"
                          onChange={(e) => {
                            props.setFieldValue("is_paid", e.target.checked);
                          }}
                          // value={false}
                        >
                          Paid
                        </Checkbox>

                        <HStack>
                          <Badge colorScheme="green" rounded="28" p="1" px="2">
                            Total Price : ₹{" "}
                            {`${
                              props.values.selling_rate *
                              props.values.total_items
                            }`}
                          </Badge>
                          <Badge colorScheme="green" rounded="28" p="1" px="2">
                            Total Item : {`${props.values.total_items || "0"}`}
                          </Badge>
                        </HStack>
                      </HStack>
                    </VStack>
                  </ModalBody>
                  <ModalFooter w="full">
                    <Button
                      colorScheme="red"
                      variant="outline"
                      mr={3}
                      onClick={onClose}
                      w="50%"
                    >
                      Discard
                    </Button>

                    <Button
                      colorScheme="teal"
                      w="50%"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Create Sales Order
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalContent>
        </Modal>
        <Modal isOpen={isEditModalOpen} size="2xl" onClose={onEditModalClose}>
          <ModalOverlay />
          <ModalContent>
            <Formik
              initialValues={{
                invoice_number: 120,
                invoice_date: "",
                customer: selectedCustomer.value,
                selling_rate: skuItems.selling_rate,
                total_items: skuItems.total_items,
                products: selectedProduct,
                is_paid: false,
              }}
              validationSchema={addSalesOrdSchema}
              onSubmit={(values, actions) => {
                alert(JSON.stringify(values, null, 3));
                // setProducts([...products, { ...values }]);
                setProducts([
                  ...products,
                  {
                    id: products[products.length - 1].id + 1,
                    display_id: 8,
                    owner: 1080,
                    name: selectedCustomer.value,
                    category: "The god of War",
                    characteristics: "New Product Characteristics",
                    features: "",
                    brand: "New Product Brand",
                    paid: values.is_paid,
                    sku: [
                      {
                        id: 248,
                        selling_price: values.selling_rate,
                        max_retail_price: 44,
                        amount: 33,
                        unit: "kg",
                        quantity_in_inventory: 0,
                        product: 209,
                      },
                      {
                        id: 247,
                        selling_price: 32,
                        max_retail_price: 32,
                        amount: 33,
                        unit: "kg",
                        quantity_in_inventory: 0,
                        product: 209,
                      },
                      {
                        id: 246,
                        selling_price: 23,
                        max_retail_price: 21,
                        amount: 22,
                        unit: "kg",
                        quantity_in_inventory: 1,
                        product: 209,
                      },
                    ],

                    updated_on: `${newDateFormat}`,
                    adding_date: "2024-05-24T12:46:41.995828Z",
                  },
                ]);
                actions.resetForm();
                toast({
                  title: "Successfully Added Sales Order",
                  description: "New Sales Order is created .",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                onClose();
              }}
              // alert(JSON.stringify(values, null, 2));
              //   setTimeout(() => {
              //     alert(JSON.stringify(values, null, 2));
              //     actions.setSubmitting(false);
              //   }, 1000);
              //   actions.resetForm();
              //   console.log(values, "vals");
              // }}
            >
              {(props) => (
                <Form>
                  <ModalHeader textTransform="uppercase">
                    {" "}
                    <Badge
                      colorScheme="green"
                      rounded={28}
                      p={2}
                      mx="auto"
                      display="block"
                      w="fit-content"
                    >
                      Edit Sales Order{" "}
                    </Badge>
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack spacing={4} align="flex-start" w="full">
                      <HStack
                        display="flex"
                        justifyContent="space-between"
                        w="full"
                      >
                        <Field name="invoice_number">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.invoice_number &&
                                form.touched.invoice_number
                              }
                            >
                              <FormLabel>Invoice Number</FormLabel>
                              <Input
                                {...field}
                                placeholder="Enter invoice number"
                                type="text"
                              />
                              <FormErrorMessage>
                                {form.errors.invoice_number}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="invoice_date">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.invoice_date &&
                                form.touched.invoice_date
                              }
                            >
                              <FormLabel>Invoice Date</FormLabel>
                              <Input
                                {...field}
                                placeholder="Enter invoice Date"
                                type="date"
                              />
                              <FormErrorMessage>
                                {form.errors.invoice_date}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </HStack>
                      {/* <FormControl isRequired>
                                <FormLabel>Customers</FormLabel>
                                <Select
                                  placeholder="Select a Customer"
                                  name="customer"
                                  onChange={formik.handleChange}
                                  value={formik.values.customer}
                                >
                                  <option>Customer1</option>
                                  <option>Customer2</option>
                                  <option>Customer3</option>
                                </Select>
                              </FormControl> */}
                      <Field name="customer">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.customer && form.touched.customer
                            }
                          >
                            <FormLabel>Customer</FormLabel>
                            <Select
                              {...field}
                              placeholder="Select a Customer"
                              value={selectedCustomer}
                              options={CustomerOptions}
                              onChange={(selectedCustomer) =>
                                setSelectedCustomer(selectedCustomer)
                              }
                            />
                            <FormErrorMessage>
                              {form.errors.customer}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="products">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.products && form.touched.products
                            }
                          >
                            <FormLabel>All Products</FormLabel>
                            <Select
                              placeholder="Select a Product"
                              options={productOptions}
                              displayValue="productOption"
                              w="full"
                              value={selectedProduct}
                              onChange={(e) => setSelectedProduct(e)}
                              isMulti={true}
                            />
                            <FormErrorMessage>
                              {form.errors.products}
                            </FormErrorMessage>
                            {selectedProduct.map((prod, i) => {
                              return (
                                <Accordion allowMultiple mt={3} key={i}>
                                  <AccordionItem>
                                    <h2>
                                      <AccordionButton>
                                        <Box
                                          as="span"
                                          flex="1"
                                          textAlign="left"
                                        >
                                          {prod.value}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                      <Box
                                        w={"full"}
                                        px={6}
                                        py={4}
                                        border={["none", "1px"]}
                                        borderColor={["", "gray.300"]}
                                        borderRadius={10}
                                      >
                                        <Flex justifyContent="space-between">
                                          <Text>{i + 1} SKU 3 (5 kg)</Text>
                                          {/* <Text>{`${i + 1}. SKU ${
                                                    product.sku.id
                                                  } (${
                                                    product.sku.quantity_in_inventory
                                                  } ${product.sku.unit} )`}</Text> */}
                                          <Badge
                                            colorScheme="gray"
                                            fontWeight={500}
                                            p={1}
                                            textTransform="none"
                                          >
                                            Rate ₹
                                            {` ${props.values.selling_rate}`}
                                          </Badge>
                                        </Flex>
                                        <Flex
                                          justifyContent="space-between"
                                          gap={2}
                                        >
                                          <Field name="selling_rate">
                                            {({ field, form }) => (
                                              <FormControl
                                                isInvalid={
                                                  form.errors.selling_rate &&
                                                  form.touched.selling_rate
                                                }
                                              >
                                                <FormLabel>
                                                  Selling Rate
                                                </FormLabel>
                                                <Input
                                                  {...field}
                                                  placeholder="Enter Selling Rate"
                                                  type="number"
                                                  min={0}
                                                />
                                                <FormErrorMessage>
                                                  {form.errors.selling_rate}
                                                </FormErrorMessage>
                                              </FormControl>
                                            )}
                                          </Field>
                                          <Field name="total_items">
                                            {({ field, form }) => (
                                              <FormControl
                                                isInvalid={
                                                  form.errors.total_items &&
                                                  form.touched.total_items
                                                }
                                              >
                                                <FormLabel>
                                                  Total Items
                                                </FormLabel>
                                                <Input
                                                  {...field}
                                                  placeholder="Enter Total Items"
                                                  type="number"
                                                  min={0}
                                                />
                                                <FormErrorMessage>
                                                  {form.errors.total_items}
                                                </FormErrorMessage>
                                              </FormControl>
                                            )}
                                          </Field>
                                        </Flex>
                                      </Box>
                                    </AccordionPanel>
                                  </AccordionItem>
                                </Accordion>
                              );
                            })}
                          </FormControl>
                        )}
                      </Field>

                      {/* <FormControl isRequired>
                                <FormLabel>All Products</FormLabel>
                                <Multiselect
                                  placeholder="Select a Product"
                                  options={options}
                                  displayValue="productOption"
                                  w="full"
                                  showArrow="true"
                                  name="products"
                                  onChange={formik.handleChange}
                                  value={formik.values.products}
                                />
                                <Accordion allowMultiple mt={3}>
                                  <AccordionItem>
                                    <h2>
                                      <AccordionButton>
                                        <Box as="span" flex="1" textAlign="left">
                                          Section 1 title
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing
                                      elit, sed do eiusmod tempor incididunt ut labore
                                      et dolore magna aliqua. Ut enim ad minim veniam,
                                      quis nostrud exercitation ullamco laboris nisi ut
                                      aliquip ex ea commodo consequat.
                                    </AccordionPanel>
                                  </AccordionItem>
                                </Accordion>
                              </FormControl> */}
                      <HStack w="full" justify={"space-between"} mt={3}>
                        <Checkbox
                          name="is_paid"
                          colorScheme="green"
                          onChange={(e) => {
                            props.setFieldValue("is_paid", e.target.checked);
                          }}
                          // value={false}
                        >
                          Paid
                        </Checkbox>

                        <HStack>
                          <Badge colorScheme="green" rounded="28" p="1" px="2">
                            Total Price : ₹{" "}
                            {`${
                              props.values.selling_rate *
                              props.values.total_items
                            }`}
                          </Badge>
                          <Badge colorScheme="green" rounded="28" p="1" px="2">
                            Total Item : {`${props.values.total_items || "0"}`}
                          </Badge>
                        </HStack>
                      </HStack>
                    </VStack>
                  </ModalBody>
                  <ModalFooter w="full">
                    <Button
                      colorScheme="red"
                      variant="outline"
                      mr={3}
                      onClick={onClose}
                      w="50%"
                    >
                      Discard
                    </Button>

                    <Button
                      colorScheme="teal"
                      w="50%"
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Create Sales Order
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalContent>
        </Modal>
        ;
      </Container>
    </>
  );
};

export default SalesOrderPage;
