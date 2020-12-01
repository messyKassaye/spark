const  checkOutStyle = theme=>({

    container:{
        padding:20,
        borderRadius:10,
        border:'5px solid white',
        width:'100%',
        display:'flex',
        marginBottom:35,
        flexDirection:'column',
        alignItems:'center',
        cursor:'pointer',
        "&:hover": {
            border:'5px solid #ebb254',
          },

    },
    innerContainer:{
        marginBottom:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    radio:{
        color:'#ebb254',
        marginRight:20
    },
    label:{
        textAlign:'center',
        color:'#ebb254'
    }
})

export default checkOutStyle