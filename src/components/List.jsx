import { useEffect } from "react";
// import useSWR from "swr";
import Item from './Item'
import { useSelector, useDispatch } from "react-redux";
import { getMarketplaceByKeyword } from '../actions/marketplace.action'
import { Box } from "@mui/material"
import styled from 'styled-components'
import {theme} from '@kepler.gl/styles';

const StyledMapConfigDisplay = styled.div`
position: absolute;
z-index: 100;
top: 0px;
left: 0px;
background-color: ${theme.sidePanelBg};
font-size: 11px;
width: 300px;
color: ${theme.textColor};
word-wrap: break-word;
/* height: 100%; */
min-height: 60px;
max-height: 100%;
padding: 10px;
`;

const List = ({searchTerm}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMarketplaceByKeyword(searchTerm))
    console.log('useEffect is called', searchTerm)
  },[dispatch,searchTerm])

  const { result, isFetching, isError } = useSelector((state) => state.app.marketplaceReducer)
  // if (result) {
  //   console.log('see result',result)
  // }
  
  let content
  if (isFetching) content = <Box>Loading...</Box>
  else if (isError) content = <Box>Something went wrong..</Box>
  else 
  if (result?.features) {
    const results = result?.features
    console.log('result?.features',result?.features)
    console.log('results??',results)
    console.log('result??',result)
    content = (
      <StyledMapConfigDisplay>
          {
            Object.values(results).map(result => {
              console.log('result item => ',result)
              return <Item key={result.properties.Id} result={result} />
            })
            }
      </StyledMapConfigDisplay>  
    )
  } 
  return content
}
export default List