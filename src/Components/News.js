import React from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from 'react';




const News = (props) => {

  const [articles, setArticles] = useState([])
  
  const [page, setPage] = useState(1)
  const [loading, setLoading]=useState(true)
  const [totalResults, setTotalResults] = useState(0)


  // For class-based component

  // static defaultProps = {
  //     country: "in",
  //     pageSize: 6,
  //     category: "general"
  //   }
  //   static propTypes = {
  //     country: PropTypes.string,
  //     pageSize: PropTypes.number,
  //     category: PropTypes.string,
  //   }

  // For class Based component 

  // constructor(props) {
  //   super(props);

  //   state = ({
  //     articles: [],
  //     loading: false,
  //     page: 1,
  //     totalResults:0
  //   })
  //   document.title = `${capitalizeLetter(props.category)}-News Now`;
  // }

  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  const newsUpdate = async () => {
    props.setProgress(10);
    const url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=70dc74301d384f51a56221a69f0baf27&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    props.setProgress(50);
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    // setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: true

    // })
    props.setProgress(100);

  }

 useEffect(()=>{
    document.title = `${capitalizeLetter(props.category)}-News Now`;

  newsUpdate();
 },  [] )



  //(Class-Based Compnent)
  // async componentDidMount() {
  //   console.log('cdm');




  //   let url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bf5661f24c8e401ca5042a0e9b74df12&pageSize=${props.pageSize}`
  //   setState({ loading: true })

  // let data = await fetch(url)

  // let parsedData = await data.json();
  //   console.log(parsedData);
  //   setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading: false

  //   })
  // newsUpdate();




  // const handleNextClick = async () => {
  //   console.log("this is next")


    // if (!(state.page + 1 > Math.ceil(state.totalResults / props.pageSize))) {


    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bf5661f24c8e401ca5042a0e9b74df12&page=${state.page + 1}&pageSize=${props.pageSize} `;
    //   setState({ loading: true });

    //   let data = await fetch(url);
    //   let parsedData = await data.json();


    //   setState({
    //     page: state.page + 1, articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    // setState({ page: page + 1 });
    
  //   setPage(page + 1);
  //   newsUpdate();

  // }



  // const handlePrevClick = async () => {
  //   console.log("this is previous butt");

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bf5661f24c8e401ca5042a0e9b74df12&page=${state.page - 1}&pageSize=${props.pageSize} `;
    // setState({ loading: true });
    // let data = await fetch(url)
    // let parsedData = await data.json();
    // console.log(parsedData);
    // setState({
    //   page: state.page - 1, articles: parsedData.articles,
    //   loading: false
    // })
    // setState({ page: state.page - 1 })
  //   setPage(page - 1)
  //   newsUpdate();
  // }


  const fetchMoreData = async () => {
    const url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=70dc74301d384f51a56221a69f0baf27&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    

    let data = await fetch(url);

    let parsedData = await data.json();
    
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults);
    
    

    // setState({
    //   articles: state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   loading: false

    // })

  };



 
  return (

    <div className="container my-3" >

      <div className="container-fluid my-3" style={{ backgroundColor: 'yellow' }} >
        <h1 className='text-center ' style={{ fontFamily: 'serif', color: 'black' , marginTop:'90px'}} >News Now- Top  {capitalizeLetter(props.category)} Headlines </h1>
      </div>


      {/* {state.loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={ <Spinner />}
      >


        <div className="row mx-2 my-3" >


          {articles.map((element) => {
            return <div className="col md-3 my-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 42) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage}
                newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />

            </div>

          })
          }
        </div >
      </InfiniteScroll>


      {/* <div className="d-flex justify-content-between my-4 " >
          <button disabled={state.page <= 1} type="button" className="btn btn-warning " onClick={handlePrevClick} >&larr; Previous</button>

          <button disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} type="button" className="btn btn-danger" onClick={handleNextClick}  >Next &rarr;</button>
        </div> */}

    </div >
  )
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}


export default News
