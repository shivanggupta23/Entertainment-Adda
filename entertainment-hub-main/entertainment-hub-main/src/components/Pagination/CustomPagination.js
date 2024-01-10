import Pagination from "@material-ui/lab/Pagination";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
function CustomPagination({setPage, numberOfPages= 10}) {
   const handlePageChange=(page)=>{
       setPage(page);
       window.scroll(0,0);


   }

   const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

    return (
        <div
          style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
        >
        <ThemeProvider theme={darkTheme}>
        <Pagination 
        count={numberOfPages}
        onChange={(e) => handlePageChange(e.target.textContent)} 
            hidePrevButton
            hideNextButton
            color="primary"
        />
        </ThemeProvider>
        </div>
    )
}

export default CustomPagination
