import React, { useEffect,useMemo,useState } from 'react'
import {Grid,SimpleGrid, GridItem, Button, Divider,Spacer,Flex, Center, Box, Container , Spinner, Heading, Table, Tbody, Td, Th, Thead, Tr, FormControl,FormLabel,Text,FormErrorMessage,FormHelperText,Input, Menu, Tooltip, Icon, IconButton, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react"
import axios from "axios"
import {useTable,usePagination} from 'react-table'
import MouseSharpIcon from '@mui/icons-material/MouseSharp';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { PaginationItem } from '@mui/material';

const url = "http://localhost:5000/problems";

const fetchData = [
  {
    "id": 1,
    "name": "binary search",
    "level": "easy",
    "submission" : "39939"
  },
]

const tableColumn = [
  {
    Header: "ID",
    accessor : "id"
  },
  {
    Header: "NAME",
    accessor : "name"
  },
  {
    Header: "LEVEL",
    accessor : "level"
  },
  {
    Header: "SUBMISSION",
    accessor : "submission"
  },
  {
    Header : "START",
    accessor :(cellValues)=>{
      return (
        <Button size='sm' rightIcon={<MouseSharpIcon />} variant='outline' colorScheme='cyan'>
          Start
        </Button> 
        
        
      )
    }
  }
]

const Problem = () => {
  const [problems,setProblems] = useState([]);
  const[value,setValue] = useState("");
  const[sortValue, setSortValue] = useState("");
  const[currentPage, setCurrentPage] = useState(0);
  const[pageLimit] = useState(4);
  const[sortFilterValue,setSortFilterValue] = useState("");
  const[operation, setOperation] = useState("");

  const sortOptions = ['id','submission']

  const columns = useMemo(()=>tableColumn,[])
  const data = useMemo(()=>problems,[problems])
  const 
  {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    gotoPage,
    nextPage,
    prevPage,
    pageCount,
    rows,
    pageOptions,
    setPageSize,
    state:{
      pageIndex,
      pageSize
    },
  } = useTable({
          columns,
          data,
          initialState:{pageIndex:1},
        },
        usePagination 
        );
  
  useEffect(()=>{fetchProblems(0,4,0);},[])

  const fetchProblems = async (start,end,increase,optType = null, filterOrSortValue) =>{
    switch(optType){
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios.get(`http://localhost:5000/problems?q=${value}&_start=${start}&_end=${end}`).then((response) => {
        setProblems(response.data);
        setCurrentPage(currentPage + increase)
        
    })
    .catch((err)=>console.log(err));
    default:
      try{
        const {data} = await axios.get(`http://localhost:5000/problems?_start=${start}&_end=${end}`).then((response)=>{setProblems(response.data);setCurrentPage(currentPage + increase)}).catch((err)=>console.log(err));
      }
      catch(error){
        console.log(error);
      }
    } 
  };
  console.log(problems);

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchProblems(0,4,0,"search");
    // return await axios.get(`http://localhost:5000/problems?q=${value}`).then((response) => {
    //   setProblems(response.data);
    //   setValue("")
    // })
    // .catch((err)=>console.log(err));
  };
  const handleReset = (e) => { 
    fetchProblems(0,4,0); 
    setOperation("");
    setValue("");
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios.get(`http://localhost:5000/problems?_sort=${value}&_order=asc`).then((response) => {
      setProblems(response.data);
    })
    .catch((err)=>console.log(err));
  };
  
  const handleFilter = async (value) => {
    return await axios.get(`http://localhost:5000/problems?status=${value}`).then((response) => {
      setProblems(response.data);
    })
    .catch((err)=>console.log(err));
  };

  const renderPagination = () =>{
    if(data.length<4&&currentPage ===0) return null;
    if(currentPage === 0){
      return (
        <Flex justify="space-between" m={4} align="center">
              <Flex gap="4">
                <Tooltip label="First Page">
                  <Button onClick={() => fetchProblems(4, 8, 1, operation)}>Next</Button>
                </Tooltip>
              </Flex>
          </Flex>
      )
    } else if ( currentPage < pageLimit - 2 && data.length === pageLimit){
      return (
        <Flex justify="space-between" m={4} align="center">
              <Flex gap="4">
                <Tooltip>
                  <Button onClick={() => fetchProblems((currentPage -1)*4,currentPage * 4, -1, operation)}>Prev</Button>
                </Tooltip>
              
                <Tooltip>
                  <Button onClick={() => fetchProblems((currentPage + 1) * 4,(currentPage + 2)*4,1,operation)}>Next</Button>
                </Tooltip>
              </Flex>
          </Flex>
      )
    }else{
      return(
        <Flex justify="space-between" m={4} align="center">
              <Flex gap="4">
                <Tooltip>
                  <Button onClick={() => fetchProblems((currentPage - 1), currentPage * 4 ,-1,operation)}>Prev</Button>
                </Tooltip>
              </Flex>
          </Flex>
      )
    }
  }

  if(problems.length === 0) return (
    <Center>
      <Spinner/>
    </Center>
  );

  return (
    <>
      <Center>
        <Container  padding='4' maxW='6xl' >
          <div>
            
            <Center>
              <Heading color="#6D5D6E" maxW='28rem'>Problems</Heading><Spacer/>
              <form action = "" class="w-full max-w-md" onSubmit={handleSearch}>
              <div class = "relative flex items-center text-gray-400 focus-within:text-gray-600">
                <SearchOutlinedIcon class="w-5 h-5 absolute ml-3 pointer-events-none" />
                <input
                  type="text"
                  name="search"
                  placeholder='Search'
                  autoComplete='off'
                  aria-label='Search'
                  class='pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2'
                  value={value}
                  onChange={(e)=>setValue(e.target.value)}
                />
                <Spacer/>
                
                <Divider orientation='vertical' />
                <Button size='sm' height='45px' width='170px' colorScheme='cyan' variant='solid' fontSize='14px' fontWeight='semibold' onClick={() => handleReset()}>

                <Text color='white'>Reset</Text></Button> 
              </div>
            </form>
            </Center>
          

            <Table variant = 'striped' colorScheme='cyan' {...getTableProps()}>
              <Thead>
                {
                  headerGroups.map((headerGroups)=>(
                    <Tr{...headerGroups.getHeaderGroupProps()}>
                      {headerGroups.headers.map((column)=>(
                        <Th fontSize="md" {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </Th>
                      ))}
                    </Tr>
                  ))
                }
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {
                  rows.map((row,i) => {
                    prepareRow(row);
                    return(
                      <Tr {...row.getRowProps()}>
                        {row.cells.map((cell)=>(
                          
                          <Td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                            
                          </Td>  
                        ))}
                        
                        
                      </Tr>
                    )
                  })
                }
              
              </Tbody>
              
            </Table>
            <br></br>
            <Center>
              {renderPagination()}</Center>
            
          
          </div>
          
          
          <Center>
          <div class="flex flex-col ">
            
            <div class="flex flex-row ">
            <Heading color="#6D5D6E" size="25px" mr = "50px">Sort By : </Heading>
              <select style ={{width: "50%", borderRadius:"2px", height:"35px" , marginRight:"10px"}}
                    onChange={handleSort}
                    value = {sortValue}
                    >
                      <option>Please Select Value</option>
                      {sortOptions.map((item,i)=>(
                        <option value= {item} key={i}> {item}</option>
                      ))}
                    </select>
            </div>
            <br></br>
            <div class="flex flex-row ">
            <Heading color="#6D5D6E" mr = "50px" size='100px'>Filter By:</Heading>
              <Button size='md' variant='outline' colorScheme='cyan' width='100px' mr='50px' onClick={() => handleFilter("Easy")}>
                    Easy
                  </Button>
                  
                  <Button size='md' variant='outline' colorScheme='cyan' width='100px' mr='50px'  onClick={() => handleFilter("Medium")}>
                    Medium
                  </Button>
                
                  <Button size='md' variant='outline' colorScheme='cyan' width='100px' mr='50px' onClick={() => handleFilter("Hard")}>
                    Hard
                  </Button>
            </div>
            
          </div>
          </Center>
        </Container>
      </Center>
    </>
  )
}

export default Problem