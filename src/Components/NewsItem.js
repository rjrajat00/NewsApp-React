import React from 'react'

const NewsItem=(props)=> {
  
    let {title, description,imageUrl ,newsUrl} = props;
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem"}}>

           <div className="container" style={{right:'0',left:'5%', display:'flex',position:'absolute', justifyContent:'flex-end'}}>

        <span className=" badge rounded-pill bg-danger"  >{props.source}</span>
           </div>


            < img src={!imageUrl?"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202209/Jupiter_2_2.jpg?x385pWiJiOx3mjLBO6PA8uIMoivqKzLD&size=770:433":imageUrl} className= "card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}...
              </h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-danger font-monospace">By {props.author} on {new Date(props.date).toGMTString()}</small></p>
  
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div >
    )
  
}

export default NewsItem
