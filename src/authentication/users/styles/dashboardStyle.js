
const  dashboardStyle = theme=>({
   bigDevice:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'center',
       [theme.breakpoints.down('xs')]:{
           display:'none'
       }
   },
   smallDevice:{
       display:'none',
       [theme.breakpoints.down('xs')]:{
           display:'flex',
           flexDirection:'row',
           justifyContent:'center',
       }
   }

})

export default dashboardStyle