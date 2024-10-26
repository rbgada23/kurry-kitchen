import { useState, useEffect } from 'react'
    
const Toaster = ({ variant, children }) => {
  const [show, setShow] = useState(true)

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(true)
    }, 3000)
   setShow(true);
    return () => {
      clearTimeout(timeId)
    }
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }

  // If show is true this will be returned
  return (
    // <div className={`alert alert-${variant} w-fit`}>
    //   {children}
    // </div>
   <div className="toast toast-top toast-end z-10">
   <div className="alert alert-success">
     <span>Logged in succesfully</span>
   </div>
 </div>
  )
}

Toaster.defaultPros = {
  variant: 'info',
}

export default Toaster;
