import { useState,useEffect } from "react"
import { TextField } from "@material-ui/core"
import { Button,Tabs,Tab } from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Search() {
    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [content, setContent] = useState()
    const [noOfPages, setNoOfPages] = useState()
    const darkTheme = createMuiTheme({
        palette: {
          type: "dark",
          primary: {
            main: "#fff",
          },
        },
      });

      const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          setNoOfPages(data.total_pages);
          // console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page]);
    

    return (
        <div>
        <ThemeProvider theme={darkTheme}>
           <div className="search" style={{display:"flex", margin: "15px 0"}}>
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
          
        </div>
        <Tabs value={type} 
        indicatorColor="primary"
          textColor="primary" 
        onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
        >
        <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
        </ThemeProvider>

        <div className="trending">
              {  content && content.map((c)=>(
                 
                  <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={type? "tv" : "movie"}
                    vote_average={c.vote_average}
                  />
              )) }
              {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {noOfPages>1 &&(
            <CustomPagination setPage={setPage} numberOfPages={noOfPages}/>
            )}

        </div>
    )
}

export default Search
