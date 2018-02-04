"use strict";

function addClass($element, targetClass)
{
  if(hasClass($element, targetClass) === false)
  {
    $element.className += " " + targetClass;
  }
}

function getSum(array)
{
  var sum = 0;

  for(var i = 0; i < array.length; i++)
  {
    sum += array[i];
  }

  return sum;
}

function hasClass($element, targetClass)
{
  var rgx = new RegExp("(?:^|\\s)" + targetClass + "(?!\\S)", "g");

  if($element.className.match(rgx))
  {
    return true;
  }
  else
  {
    return false;
  }
}

function inArray(target, array)
{
  for(var i = 0; i < array.length; i++) 
  {
    if(array[i] === target)
    {
      return true;
    }
  }

  return false; 
}

function massAddEventListener($elements, event, customFunction, useCapture)
{
  var useCapture = useCapture || false;
                                                  
  for (var i = 0; i < $elements.length; i++)
  {
    $elements[i].addEventListener(event, customFunction, useCapture);
  }
}

function randomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomUniqueInts(min, max, count, nonZero = false) // unsafe
{
  var temp = [];
  
  while(temp.length < count)
  {
    var number = randomInt(min, max);
    var unique = true;
  
    for(var i = 0; i < temp.length; i++)
    {
      if(Math.abs(temp[i]) === Math.abs(number) || (nonZero === true && number === 0))
      {
        unique = false;
        break;
      }
    }
  
    if(unique === true)
    {
      temp[temp.length] = number;
    }
  }
  
  return temp;
}

function removeClass($element, targetClass)
{                    
  var rgx = new RegExp("(?:^|\\s)" + targetClass + "(?!\\S)", "g");

  $element.className = $element.className.replace(rgx, "");
}

function removeFromArrayByIndex(index, array)
{
  var newArray = [];

  for(var i = 0; i < array.length; i++)
  {
    if(index !== i)
    {
      newArray.push(array[i]);
    }
  }

  return newArray;
}

function removeFromArrayByValue(value, array)
{
  var newArray = [];

  for(var i = 0; i < array.length; i++)
  {
    if(array[i] !== value)
    {
      newArray.push(array[i]);
    }
  }

  return newArray;
}