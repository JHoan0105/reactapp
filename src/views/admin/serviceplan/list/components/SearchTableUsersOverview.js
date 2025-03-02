/*                                                                                                                                                                                                                                                                                                                             
=========================================================
* Provisioning Portal - v1.0.0
=========================================================
* Copyright � 2024 Guardian Mobility All Rights Reserved
=========================================================
*/

import {
  Button,
  Flex,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import React, { useMemo } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import getAccountInfo from 'services/account/getAccountInfo';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import the icons

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Default function
function SearchTable2(props) {
  const { columnsData, tableData } = props;
  const accountInfo = getAccountInfo();
  const columns = useMemo(() => columnsData || [], [columnsData]);
  const data = useMemo(() => tableData || [], [tableData]);
  const nav = useNavigate();
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
    state,
  } = tableInstance;

  const { pageIndex, pageSize } = state;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const brandColor = useColorModeValue("brand.500", "brand.400");

  // Check if tableData is null or undefined
  //if (!tableData) {
  //  return <Text color="red.500">No table data available</Text>;
  //}

  const createPages = (count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  return (
    <>
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
              <Flex
                  align={{ sm: "flex-start", lg: "flex-start" }}
                  justify={{ sm: "space-between", lg: "space-between" }} // Changed justify property to space-between for both screen sizes
                  w='100%'
                  px='22px'
                  mb='36px'
                  ml={{ base: "0", lg: "-10px", xl: "-20px" }} // Adjusting margin-left for larger screens
              >
                  <SearchBar
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      h='44px'
                      w={{ lg: "390px" }}
                      ml={{ base: "0", lg: "10px", xl: "20px" }} // Adjusting margin-left for larger screens
                      borderRadius='16px'
                  />
                  {(accountInfo?.isGuardianAdmin || accountInfo?.isAccountManagement) ? (
                      <Button
                          width='160px'
                          variant='brand'
                          color='white'
                          fontSize='sm'
                          fontWeight='500'
                          _hover={{ bg: "brand.600" }}
                          _active={{ bg: "brand.500" }}
                          _focus={{ bg: "brand.500" }}
                          onClick={() => nav('/admin/serviceplan/view/')}
                      >
                          Create Service Plan
                      </Button>
                  ) : null}
              </Flex>
        <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe='10px'
                    key={index}
                    borderColor={borderColor}>
                    <Flex
                      justify='space-between'
                      align='center'
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color='#F26539'>
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "PLAN NAME") {
                      data = (
                          <Text color={textColor} fontSize='md' fontWeight='500'>
                              {cell.value}
                          </Text>
                      );
                    } else if (cell.column.Header === "NAME") {
                      data = (
                        <Text color={textColor} fontSize='md' fontWeight='500'>
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "VOICE SERVICE") {
                      if (cell.value !== "") {
                        data = (
                          <Flex justifyContent="left">
                            <FaCheckCircle color="green" size={20} style={{ marginLeft: '45px' }} />
                          </Flex>
                        );
                      } else {
                        data = (
                          <Flex justifyContent="left">
                            <FaTimesCircle color="red" size={20} style={{ marginLeft: '45px' }} />
                          </Flex>
                        );
                      }
                    } else if (cell.column.Header === "DATA SERVICE") {
                      if (cell.value !== "") {
                        data = (
                          <Flex justifyContent="left">
                            <FaCheckCircle color="green" size={20} style={{ marginLeft: '45px' }} />
                          </Flex>
                        );
                      } else {
                        data = (
                          <Flex justifyContent="left">
                            <FaTimesCircle color="red" size={20} style={{ marginLeft: '45px' }} />
                          </Flex>
                        );
                      }
                    } else if (cell.column.Header === "VPN SERVICE") {
                      if (cell.value !== "") {
                        data = (
                          <Flex justifyContent="left">
                            <FaCheckCircle color="green" size={20} style={{ marginLeft: '15px' }} />
                          </Flex>
                        );
                      } else {
                        data = (
                          <Flex justifyContent="left">
                            <FaTimesCircle color="red" size={20} style={{ marginLeft: '15px' }} />
                          </Flex>
                        );
                      }
                    } else if (cell.column.Header === "ACTIONS") {
                      data = (
                        <Text
                          as= { Link }
                          to={`/admin/serviceplan/view`}
                          state={{ rowData: row.original } }
                          cursor='pointer'
                          color= { brandColor }
                          textDecoration='underline'
                          fontSize='md'
                          fontWeight='500'
                          id={cell.value}>
                          View
                        </Text>
                      );                 
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor={borderColor}>
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex
          direction={{ sm: "column", md: "row" }}
          justify='space-between'
          align='center'
          w='100%'
          px={{ md: "22px" }}>
          <Text
            fontSize='xs'
            color='#F26539'
            fontWeight='normal'
            mb={{ sm: "24px", md: "0px" }}>
            Showing {pageSize * pageIndex + 1} to{" "}
            {pageSize * (pageIndex + 1) <= tableData.length
              ? pageSize * (pageIndex + 1)
              : tableData.length}{" "}
            of {tableData.length} entries
          </Text>
          <Stack direction='row' alignSelf='flex-end' spacing='4px' ms='auto'
          >
            <Button
              variant='no-effects'
              onClick={() => previousPage()}
              transition='all .5s ease'
              size='small'
              w='25px'
              h='25px'
              borderRadius='50%'
              bg='transparent'
              border='1px solid'
              borderColor={useColorModeValue("gray.200", "white")}
              display={
                pageSize === 5 ? "none" : canPreviousPage ? "flex" : "none"
              }
              _hover={{
                bg: "whiteAlpha.100",
                opacity: "0.7",
              }}>
              <Icon as={MdChevronLeft} w='16px' h='16px' color={textColor} />
            </Button>
            {pageSize === 5 ? (
              <NumberInput
                max={pageCount - 1}
                min={1}
                w='75px'
                mx='6px'
                defaultValue='1'
                onChange={(e) => gotoPage(e)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={() => nextPage()} />
                  <NumberDecrementStepper onClick={() => previousPage()} />
                </NumberInputStepper>
              </NumberInput>
            ) : (
              createPages(pageCount).map((pageNumber, index) => {
                return (
                  <Button
                    size='small'
                    variant='no-effects'
                    transition='all .5s ease'
                    onClick={() => gotoPage(pageNumber - 1)}
                    w='25px'
                    h='25px'
                    borderRadius='50%'
                    bg={
                      pageNumber === pageIndex + 1 ? brandColor : "transparent"
                    }
                    border={
                      pageNumber === pageIndex + 1
                        ? "none"
                        : "1px solid lightgray"
                    }
                    _hover={
                      pageNumber === pageIndex + 1
                        ? {
                          opacity: "0.7",
                        }
                        : {
                          bg: "whiteAlpha.100",
                        }
                    }
                    key={index}>
                    <Text
                      fontSize='xs'
                      color={pageNumber === pageIndex + 1 ? "#fff" : textColor}>
                      {pageNumber}
                    </Text>
                  </Button>
                );
              })
            )}
            <Button
              variant='no-effects'
              onClick={() => nextPage()}
              transition='all .5s ease'
              size='small'
              w='25px'
              h='25px'
              borderRadius='50%'
              bg='transparent'
              border='1px solid'
              borderColor={useColorModeValue("gray.200", "white")}
              display={pageSize === 5 ? "none" : canNextPage ? "flex" : "none"}
              _hover={{
                bg: "whiteAlpha.100",
                opacity: "0.7",
              }}>
              <Icon as={MdChevronRight} w='16px' h='16px' color={textColor} />
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export default SearchTable2;
