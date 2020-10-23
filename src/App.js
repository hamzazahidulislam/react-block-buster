import React from 'react';
import News, {newsCategory} from './news';

import Header from './components/Header';
import NewsList from './components/NewsList';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
// import Lifecyle from './lifecycle';

// const fakeNews  = [
//   {
//     title:'Ttile',
//     content:'Content',
//     url:'https://hamzazahid.com',
//     urlToImage:'https://hamzazahid.com',
//     publishedAt:'2020-09-25T00:20:31.400+00:00',
//     source:{
//       name:'HAMZA'
//     }
//   },
//   {
//     title:'Ttile',
//     content:'Content',
//     url:'https://hamzazahid.com',
//     urlToImage:'https://hamzazahid.com',
//     publishedAt:'Published date and Time',
//     source:{
//       name:'HAMZA'
//     }
//   }
// ]
// const URL = `http://jsonplaceholder.typicode.com/users`;
// axios.get(URL)
//   .then(res =>{
//     console.log(res)
//   })

// const user ={
//   name : 'hamza'
// }
// axios.post(URL,user)
//     .then(res =>{
//       console.log(res)
//     })
const news = new News(newsCategory.technology)
class App extends React.Component {

  state = {
    data:{},
    isLoading:true
  };
  aboutResult = React.createRef()
  jumbotronRef = React.createRef()
  searhRef = React.createRef()
  cbRef = null;
  itemRefList = []
  goToTop = () =>{
    window.scroll(0,this.aboutResult.current.scrollTop)
  }
  componentDidMount(){
    news.getNews()
      .then(data =>{
        this.setState({data,isLoading:false})
      })
      .catch(e =>{
        console.log(e)
        alert('Somthing Wrong')
        this.setState({isLoading:false})
      })
  }
  next = () =>{
    if(this.state.data.isNext){
      this.setState({isLoading:true})
    }
    news.next()
      .then(data =>{
        this.setState({data,isLoading:false})
      })
      .catch(e =>{
        console.log(e)
        alert('Somthing Wrong')
        this.setState({isLoading:false})
      })
  }
  prev = () =>{
    if(this.state.data.isPrevious){
      this.setState({isLoading:true})
    }
    news.prev()
      .then(data =>{
        this.setState({data,isLoading:false})
      })
      .catch(e =>{
        console.log(e)
        alert('Somthing Wrong')
        this.setState({isLoading:false})
      })
  }
  handlePageChange = value =>{
    this.setState({
      data:{
        ...this.state.data,
        currentPage:Number.parseInt(value)
      }
    })
  }
  goToPage = () =>{
    this.setState({isLoading:true})
    news.setCurrentPage(this.state.data.currentPage)
      .then(data =>{
          this.setState({data,isLoading:false})
      })
      .catch(e =>{
        console.log(e)
        alert('Somthing Wrong')
        this.setState({isLoading:false})
      })
  }
  changeCategory = category =>{
    this.setState({isLoading:true})
    news.changeCategory(category)
      .then(data =>{
        this.setState({data,isLoading:false})
      })
      .catch(e =>{
        console.log(e)
        alert('Somthing Wrong')
        this.setState({isLoading:false})
      })
  }
  search = searchTerm =>{
        this.setState({isLoading:true})
    news.search(searchTerm)
      .then(data =>{
        this.setState({data,isLoading:false})
      })
      .catch(e =>{
        console.log(e)
        alert('Somthing Wrong')
        this.setState({isLoading:false})
      })
  }
render(){
  const {
    articles,
    isNext,
    isPrevious,
    totalPage,
    currentPage,
    category,
    totalResults
  } = this.state.data

    return (
    <div className='container'>
      <div className='row'>
          <div className="col-sm-6 offset-md-3">
            <Header category={category} 
              changeCategory={this.changeCategory}
              search={this.search}
              ref={this.searhRef}
            />
            <div ref={this.aboutResult} className='d-flex'>
                <p ref={el => this.cbRef = el} className='text-black-50'>
                  About {totalResults} result Found
                </p>
                <p className='text-black-50 ml-auto'>
                    {currentPage} page of {totalPage}
                </p>
            </div>
            {/* <Lifecyle count={100} /> */}
            {this.state.isLoading ? (
                      <Loading/>
            ): (
              <div>
                    <NewsList news={articles} ref={this.itemRefList}/>
                     <Pagination 
                        next={this.next}
                        prev={this.prev}
                        isPrevious={isPrevious}
                        isNext={isNext}
                        totalPage={totalPage}
                        currentPage={currentPage}
                        handlePageChange={this.handlePageChange}
                        goToPage={this.goToPage}
                     />
                     <button className='btn btn-secondary my-5' onClick={this.goToTop}>Go To Top</button>
              </div>
            )}
            
          </div>
      </div>
    </div>
  );
}
}

export default App;
