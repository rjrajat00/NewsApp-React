import React  from 'react'
import loading from './loading.gif'

const Spinner =()=> {

  return (
    <div className='text-center my-3' style={{ height: '5 px', width: "5 px" }} >
      <img src={loading} alt="loading" />
    </div>
  )

}

export default Spinner
