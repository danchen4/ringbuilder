import React, {useState} from 'react'
import classes from './CheckboxGroup.module.scss'

interface CheckboxGroupProps {
  //** Header for the radio button group */
  header: string;
  //** Array of strings for values*/
  values: string[];
  //** Name property of radio buttons to group by */
  name?: string;
  //** radio button that was selected */
  selected?: string;
  //** Handler callback to determine radio button selection */
  checked(e: any): void;
}

const valuesToChecked = (arr: string[]) => {
  const obj:any = {};
  
  arr.forEach((item: string, index: number) => {
    // index === 0 ? obj[item] = true : obj[item] = false;   
    obj[item] = false;   
  })

  return obj;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ header, values, checked}) => {
  const [isChecked, setIsChecked] = useState(valuesToChecked(values));
  

  const changeHandler = (e: any) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;

    const isCheckedCopy = {
      ...isChecked,
      [name]: value,
    }

    // will re-render and make checkbox show checked or unchecked;
    setIsChecked(isCheckedCopy)


    // console.log('isChecked', isCheckedCopy);
    // send object of checked values 
    checked(isCheckedCopy);
  }

  return (
    <div>
      <div className={classes.CheckboxGroup}>
        <h5>{header}</h5>
        {values.map((value: string, index: number) => {
          return (
            <div className="checkbox" key={value}>
              <input
                type="checkbox"
                value={value}
                name={value}
                onChange={changeHandler}
                checked={isChecked.name}
              />
              <label>{value}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CheckboxGroup