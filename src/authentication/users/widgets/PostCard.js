import { Avatar, Backdrop, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Icon, IconButton, Typography } from '@material-ui/core'
import { Clear, FastRewind, FlipToBackSharp, Forward, Room, School, Star } from '@material-ui/icons';
import React,{ useState, useMemo } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import withStyles from '@material-ui/core/styles/withStyles'
import postCardStyle from '../styles/postCardStyle'
import TinderCard from 'react-tinder-card';
import rewind from '../../../assets/rewind.png'
import nope from '../../../assets/nope.png'
import star from '../../../assets/star.png'
import super_like from '../../../assets/super_like.png'
import axios from 'axios'
import love from '../../../assets/love.png'
import { red } from '@material-ui/core/colors';
import { API_URL } from '../../../constants/constants';
import { makeStyles } from '@material-ui/core/styles';
import NoPeersIsFound from './NoPeersIsFound';
import WorkIcon from '@material-ui/icons/Work';
const useStyles = makeStyles((theme) => ({
    buttons:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:15,
        [theme.breakpoints.down('xs')]:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            maxWidth:500,
            marginTop:0
        }
    },
    icons:{
        width:70,
        height:70,
        [theme.breakpoints.down('xs')]:{
            width:60,
            height:60
        }
    }
  }));
const alredyRemoved = []
const dataHolder=[];
let charactersState = ''

  function PostCard(props){  
  const classes = useStyles();
  charactersState = props
  const [characters, setCharacters] = useState(props.post.users)
  const [lastDirection, setLastDirection] = useState()
  const [latestIndex,setLatestIndex] = useState()
  const [direction,setDirection] = useState()
  const [total,setTotal] = useState(0)
  const [rewinds,setRewinds] = useState(false)

  const childRefs = useMemo(() => Array(props.post.users.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
    alredyRemoved.push(nameToDelete)
   
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    const cardsLeft = props.post.users.filter(person => !alredyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = props.post.users.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      console.log(props.post.users)
      setLatestIndex(index)
      setDirection(dir)
      saveLike(dir,props.post.users[index],props)
      alredyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      setTimeout(()=>{
        childRefs[index].current.swipe(dir) // Swipe the card!
        setTotal(total+1)
      },500)
      
    }

  }

  const saveLike = (dir,user,props)=>{
      dataHolder.push(props.post)
      if(dir==='right'){
        const formData = new FormData();
        formData.append('user_id',user.id);
       axios.post(`${API_URL}matches`,formData)
       .then(response=>response.data)
       .then(response=>{
           if(response.status){
               fetchNewData(props)
           }
       })
      }
  }

  const fetchNewData = (props)=>{
      dataHolder.push(props.post)
      console.log(`Data: ${dataHolder.length}`)
      axios.get(`${API_URL}posts/single`)
      .then(response=>response.data)
      .then(res=>{
          props.post[dataHolder.length-1] = res.data
      })
  }

  const rewindUser = (status)=>{
        setRewinds(status)
  }

        return (
           <div style={{width:'90%',overflow:'hidden',display:'flex',flexDirection:'row',justifyContent:'center'}}>
            
            {
                rewinds
                ?
                    (
                        <Card style={{width:400,height:500}}>
                            <CardContent style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <Typography variant={'h6'}>
                                This person do not add more pictures
                            </Typography>
                             <Button 
                             onClick={()=>rewindUser(false)}
                             color={'primary'} variant={'text'} 
                             style={{textTransform:'none',marginTop:25}}>
                                 Back to main
                             </Button>
                            </CardContent>
                        </Card>
                    )
                :
                    (
                        <div>
                             {
                total===props.post.users.length
                ?
                    (
                        <NoPeersIsFound/>
                    )
                :
                    (
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
               
                <div style={{width: 400,maxWidth: 400,height: 500}}>
                {
                    props.post.users.map((users,index)=>(
                        <TinderCard
                        key={index}
                        style={{position: 'absolute'}}
                        ref={childRefs[index]}>
                        <Card style={{position:'absolute'}}>
                            <CardMedia 
                                style={{width:400,height:500}}
                                image={users.profile_pic_path} 
                                >
                                {
                                    latestIndex===index&&direction==='right'
                                    ?
                                        (
                                            <Typography 
                                            variant={'h3'}
                                            style={{color:'#2fe7b2',position:'absolute',top:7,left:10}}>
                                                Like
                                            </Typography>
                                        )
                                    :
                                        (null)
                                }

                                {
                                    latestIndex===index&&direction==='left'
                                    ?
                                        (
                                            <Typography 
                                            variant={'h3'}
                                            style={{color:red[500],position:'absolute',top:7,right:10}}>
                                                Nope
                                            </Typography>
                                        )
                                    :
                                        (null)
                                }
                                <CardActionArea style={{
                                position:'absolute',
                                bottom:0,
                                padding:15,
                                height:'auto',
                                boxShadow:" inset 0px 0px 0px 60px rgba(0,0,0,0.2)",
                                width:'100%',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'}}>
                                        <Typography variant={'h5'} style={{color:'white',marginBottom:5}}>
                                            {`${users.name} ${users.age}`}
                                        </Typography >
                                        {
                                            users.utility!==null
                                            ?
                                                (
                                                    <div>
                                                            {
                                                                users.utility.school!==null
                                                                ?
                                                                    (
                                                                        <div style={{display:'flex',flexDirection:'row',color:'white',marginBottom:3}}>
                                                                            <School size={'small'}/>
                                                                            <Typography style={{marginLeft:5}}>
                                                                                {users.utility.school}
                                                                            </Typography>
                                                                        </div>
                                                                    )
                                                                :
                                                                    (null)
                                                            }

{
                                                                users.utility.company!==null
                                                                ?
                                                                    (
                                                                        <div style={{display:'flex',flexDirection:'row',color:'white'}}>
                                                                            <WorkIcon size={'small'}/>
                                                                            <Typography style={{marginLeft:5}}>
                                                                                {users.utility.company}
                                                                            </Typography>
                                                                        </div>
                                                                    )
                                                                :
                                                                    (null)
                                                            }
                                                            
                                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-start',marginTop:5}}>
                                                            {
                                                                users.passions.map(passion=>(
                                                                    <Chip
                                                                     style={{backgroundColor:'rgba(0,0,0,0.5)',color:'white',marginRight:5}}
                                                                     label={passion.name}

                                                                    />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            :
                                                (null)
                                        }
                                </CardActionArea>
                            </CardMedia>
                        </Card>
                        </TinderCard>
                    ))
                }
                </div>
                
                <div className={classes.buttons}>
                     <IconButton 
                     onClick={()=>rewindUser(true)}
                     size={'medium'} 
                     color={'primary'}>
                        <Avatar
                        src={rewind}
                        className={classes.icons}
                        />
                    </IconButton>

                    <IconButton size={'medium'} color={'primary'} onClick={() => swipe('left')}>
                        <Avatar
                        src={nope}
                        className={classes.icons}
                        />
                    </IconButton>

                    <IconButton onClick={() => swipe('up')} size={'medium'} color={'primary'}>
                        <Avatar
                        src={star}
                        className={classes.icons}
                        />
                    </IconButton>

                    <IconButton 
                    onClick={() => swipe('right')}
                    size={'medium'}
                    color={'primary'}>
                        <Avatar
                        src={love}
                        className={classes.icons}
                        />
                    </IconButton>
                </div>
            </div>
                    )
            }
                        </div>
                    )
            }
           </div>
        )
  }


export default PostCard