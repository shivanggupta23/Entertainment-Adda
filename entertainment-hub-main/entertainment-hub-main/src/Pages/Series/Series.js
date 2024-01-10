import axios from "axios"
import { useState,useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Generes";
import useGenres from "../../components/hooks/useGenres";

function Series() {
     const [page, setPage] = useState(1);
     const [content,setContent] = useState([]);
     const [noOfPages, setNoOfPages] = useState();
     const [selectedGenres, setSelectedGenres] = useState([])
     const [genres, setGenres] = useState([])
     const genreforURL = useGenres(selectedGenres);
    const fetchMovies= async () =>{
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
          );
         
          setContent(data.results);
          setNoOfPages(data.total_pages);
          console.log(data.results)
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page,genreforURL])

    return (
        <div>
            <span className="page-title"> TV Series</span> 
        <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
            <div className="trending">
              {  content && content.map((c)=>(
                 
                  <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type="tv"
                    vote_average={c.vote_average}
                  />
              )) }
            </div>
            {noOfPages>1 &&(
            <CustomPagination setPage={setPage} numberOfPages={noOfPages}/>
            )}
        </div>
    )
}

export default Series
