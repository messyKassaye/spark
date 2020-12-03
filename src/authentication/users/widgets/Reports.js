import React from 'react'
import {indexReport} from '../state/actions/ReportAction'
import {connect} from 'react-redux'
import HorizontalLoading from '../loader/HorizontalLoading'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
class Reports extends React.Component{

    componentDidMount(){
        this.props.indexReport()
    }
    render() {
        return (
            <div>
                {
                    this.props.loading
                    ?
                        (
                            <HorizontalLoading height={50}/>
                        )
                    :
                        (
                            <List>
                                {
                                    this.props.reports.map(report=>(
                                        <ListItem key={report.id} button color={'primary'}>
                                            <ListItemText
                                             primary={report.name}
                                            />
                                            <Divider/>
                                        </ListItem>
                                        
                                    ))
                                }
                            </List>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state=>({
    reports:state.authReducer.usersReducer.reportReducer.reports,
    loading:state.authReducer.usersReducer.reportReducer.loading
})

export default connect(mapStateToProps,{indexReport})(Reports)