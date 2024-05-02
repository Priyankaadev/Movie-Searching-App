function useDebounce(callback, delay=1000){
//takes a callback and return a modified callback 
      let timerId;
      return (...args)=>{
        console.log(args);
      clearTimeout(timerId)
         timerId=  setTimeout(()=>{
            
         callback(...args)
        },delay)
    }

}
export default useDebounce;