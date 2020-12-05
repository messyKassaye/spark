const RightLeftMessageStyle = theme=>({
    right:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:5
    },
    innerRight:{
        margin:10,
        backgroundColor:'#fe2d55',
        width:'auto',
        color:'white',
        padding:10,
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20
    },
    left:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    innerLeft:{
        backgroundColor:'#f4f4f8',
        padding:10,
        margin:10,
        width:'auto',
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20
    }
})

export default RightLeftMessageStyle