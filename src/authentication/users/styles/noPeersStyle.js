const  noPeersStyle = theme=>({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        padding:20,marginTop:100,
        backgroundColor:'transparent'
    },
    card:{
        width:450,
        height:400,
        marginTop:-75,
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    }
})

export default noPeersStyle