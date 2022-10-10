import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor(props) {
    super(props);
    console.log("hello this is constructor from news.js");
    this.state = ({
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    })
    document.title = `${this.capitalizeLetter(this.props.category)}-News Now`;
  }

  capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }



  async newsUpdate() {
    this.props.setProgress(10);
    const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a328bb0a5fef461ea4a6a24a0596dce8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false

    })
    this.props.setProgress(100);

  }

  async componentDidMount() {
    console.log('cdm');
    //   let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf5661f24c8e401ca5042a0e9b74df12&pageSize=${this.props.pageSize}`
    //   this.setState({ loading: true })

    // let data = await fetch(url)

    // let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false

    //   })
    this.newsUpdate();


  }

  handleNextClick = async () => {
    console.log("this is next")
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {


    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf5661f24c8e401ca5042a0e9b74df12&page=${this.state.page + 1}&pageSize=${this.props.pageSize} `;
    //   this.setState({ loading: true });

    //   let data = await fetch(url);
    //   let parsedData = await data.json();


    //   this.setState({
    //     page: this.state.page + 1, articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    this.setState({ page: this.state.page + 1 });
    this.newsUpdate();

  }

  handlePrevClick = async () => {
    console.log("this is previous butt");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf5661f24c8e401ca5042a0e9b74df12&page=${this.state.page - 1}&pageSize=${this.props.pageSize} `;
    // this.setState({ loading: true });
    // let data = await fetch(url)
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1, articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 })
    this.newsUpdate();
  }


  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a328bb0a5fef461ea4a6a24a0596dce8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false

    })
    
  };


  render() {
    console.log('cdm');
    return (
      
      <div className="container my-3" >
        
        <div className="container-fluid my-3" style={{ backgroundColor: 'yellow' }} >
          <h1 className='text-center ' style={{ fontFamily: 'serif', color: 'black' }} >News Now- Top  {this.capitalizeLetter(this.props.category)} Headlines </h1>
        </div>


        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles!==this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        >


          <div className="row mx-2 my-3" >


            {this.state.articles.map((element) => {
              return <div className="col md-3 my-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 42) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />

              </div>

            })
            }
          </div >
        </InfiniteScroll>


        {/* <div className="d-flex justify-content-between my-4 " >
          <button disabled={this.state.page <= 1} type="button" className="btn btn-warning " onClick={this.handlePrevClick} >&larr; Previous</button>

          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-danger" onClick={this.handleNextClick}  >Next &rarr;</button>
        </div> */}

      </div >
    )
  }
}

export default News
