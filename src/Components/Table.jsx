import React from 'react'

function Table({username,age,address,maritalState,Department,salary}) {
  return (
    <tr>
            
      
                <td>{username}</td>
                <td>{age}</td>
                <td>{address}</td>
                <td>{maritalState ? "Married":`Unmarried`}</td>
                <td>{Department}</td>
                <td>{salary}</td>

           
  
    </tr>
  )
}

export default Table