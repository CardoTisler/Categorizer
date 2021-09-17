import './App.css';
import {useState, useEffect, SetStateAction} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Banner from './components/window/Banner'
import NavigationBar from './components/window/NavigationBar'
import Dashboard from './components/dashboard/Dashboard'
import Transactions from './components/transactions/Transactions'
import Categories from './components/categories/Categories'
import Reports from './components/reports/Reports'
import { makeStyles } from '@material-ui/core'
import { useDispatch} from 'react-redux';
import { loadCategories } from './redux/actions/categoryActions';
import { useFetchCategories } from './hooks/useFetchCategories';
import ErrorToolbar from './components/info/ErrorToolbar'
import SuccessToolbar from './components/info/SuccessToolbar'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },frameStyles: {
    margin: '3rem',
    width: '100%'
  }, content: {
    flexDirection: 'row',
    display: 'flex'
  }
})

function App() {
  const classes = useStyles()
  const [bannerTitle, setBannerTitle] = useState('Dashboard')
  const handleBannerText = (props: { text: SetStateAction<string>; }) => { setBannerTitle(props.text) }
  
  const dispatch = useDispatch()
  const fetchData = useFetchCategories()
  const {incomeCategories, expenseCategories, noneCategory} = fetchData.allCategories
  let error = fetchData.error
  
  useEffect( () => {
      if(!error){
        dispatch(loadCategories({
          incomeCategories, 
          expenseCategories, 
          noneCategory
        }))
      }
    }, [expenseCategories])

  return (
    <div className={classes.root}>
      <Banner title={bannerTitle}/>
        <div className={classes.content}>
          <Router>
            <NavigationBar onButtonClick={() => handleBannerText}/>
            
            <div className={classes.frameStyles}>
              <ErrorToolbar />
              <SuccessToolbar />
              
              <Switch>
                <Route exact path='/' component={Dashboard} />

                <Route exact path='/transactions' render={() => 
                  <Transactions />
                } />
                <Route exact path='/categories' render={() => 
                    <Categories />}
                />
                <Route exact path='/reports' component={Reports} />
              </Switch>
            </div>
          </Router>
        </div>
    </div>
  );


}

export default App;