import { Card, CardHeader, Grid } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { Skeleton } from '@material-ui/lab'
import React from 'react'

class UsersLoading extends React.Component{
    

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item md={12} xs={12} sm={12}>
                    <CardHeader
                     avatar={
                         <Skeleton
                          variant={'circle'}
                          width={40}
                          height={40}
                          style={{backgroundColor:grey[500]}}
                         />
                     }
                     title={
                         <Skeleton
                         variant={'rect'}
                         width={250}
                         height={15}
                         style={{backgroundColor:grey[500],marginBottom:10}}/>
                     }
                     subheader={
                        <Skeleton
                        variant={'rect'}
                        width={150}
                        height={15}
                        style={{backgroundColor:grey[500]}}/>
                     }
                    />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                    <CardHeader
                     avatar={
                         <Skeleton
                          variant={'circle'}
                          width={40}
                          height={40}
                          style={{backgroundColor:grey[500]}}
                         />
                     }
                     title={
                         <Skeleton
                         variant={'rect'}
                         width={250}
                         height={15}
                         style={{backgroundColor:grey[500],marginBottom:10}}/>
                     }
                     subheader={
                        <Skeleton
                        variant={'rect'}
                        width={150}
                        height={15}
                        style={{backgroundColor:grey[500]}}/>
                     }
                    />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                    <CardHeader
                     avatar={
                         <Skeleton
                          variant={'circle'}
                          width={40}
                          height={40}
                          style={{backgroundColor:grey[500]}}
                         />
                     }
                     title={
                         <Skeleton
                         variant={'rect'}
                         width={250}
                         height={15}
                         style={{backgroundColor:grey[500],marginBottom:10}}/>
                     }
                     subheader={
                        <Skeleton
                        variant={'rect'}
                        width={150}
                        height={15}
                        style={{backgroundColor:grey[500]}}/>
                     }
                    />
                </Grid>
            </Grid>
        )
    }
}

export default UsersLoading