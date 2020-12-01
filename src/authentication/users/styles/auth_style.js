import {deepOrange, deepPurple, green, grey, red} from "@material-ui/core/colors";

const drawerWidth = 400;

const  authstyle = theme=>({
    root: {
        display: 'flex',
        padding: 0,
        backgroundColor:'#f5f7fa'
    },
    parent: {
        backgroundColor: '#2B2B2B',
        marginRight:20,
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
        '&:hover': {
                backgroundColor: '#1976d2',
               borderTopRightRadius:50,
               borderBottomRightRadius:50,
            },
        },
    drawerRoot:{
        height:'100%',
        width: '100%',
        position:'relative',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#f5f7fa'
    },
    avatarLoading:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:30
    },
    avatarLayout:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'start',
        alignItems:"center",
        height:'100%',
        width:'90%',
        marginLeft:30
    },
    link:{
        color:'white',
        textDecoration:'none',
        cursor:'pointer',
        marginLeft:15
    },
    avatarImage: {
        margin: 3,
        marginRight: 10
    },

    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        display:'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        paddingTop: 20,
    },
    grow:{
        flexGrow: 1
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
    flags: {
        paddingRight: 20
    },
    language: {
        display:'flex',
        marginRight: 10,
        textAlign: 'center',
        fontSize: 14,
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    card1:{
        backgroundColor:deepOrange[500],
        color:'white',
        [theme.breakpoints.down('xs')]:{
            width:'100%'
        }
    },
    card2:{
        backgroundColor:deepPurple[500],
        color:'white',
        paddingBottom:0,
        paddingTop:0

    },
    card3:{
        backgroundColor:'#3C4252',
        color:'white'
    },
    card4:{
        backgroundColor:green[500],
        color:'white'
    },
    cardActions:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"flex-end",
        alignItems:'center',
    },
    logo:{
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none',
        }
    },
    app_name:{
        marginLeft: 10,
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            marginLeft:-20
        }
    },
    profile:{
        display:'flex',
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    circleAvator:{
        width:100,
        height: 100,
        borderRadius:'50%',
        backgroundColor:deepOrange[500],
        alignItems:'center',
        color:'white',
        fontSize:'2.5em',
        justifyContent:'center'
    },
    sub_menu:{
        backgroundColor:grey[800],
        border:'1px solid #2B2B2B'
    },
    fab: {
        position: 'fixed',
        textTransform:'none',
        bottom: theme.spacing(2),
        right: theme.spacing(10),
      },
      finance:{
        display:'flex',
        [theme.breakpoints.up('xs')]:{
            display:'none'
        }
    }
     
      
})

export default authstyle
