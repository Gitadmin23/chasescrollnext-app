import React from 'react';
import CustomText from './Text';
export const handleLinks = (text: string, showMore?: boolean) => {
    const regex = /(https?:\/\/[^\s]+)/g; // Regular expression to match words starting with a pound sign
    // const parts = text?.split(regex); // Split the text using the regex pattern

    if (text.startsWith('http') || text.startsWith("www.")) {
      return (
            <a href={text} target='_blank' style={{ fontFamily:'DM-Medium', color:'blue'}}>{showMore ? text : text.substring(0, 130)}</a>
      );
    } else {
      return <CustomText>{showMore ? text : text.substring(0, 130)}</CustomText> // Preserve non-matched parts
    }
  
    // if (parts) {
    //   return parts.map((part, index) => {
    //     if (part.match(regex)) {
    //       return (
    //         <a href={part} key={index.toString()} target='_blank'style={{ fontFamily:'DM-Medium', color:'blue'}}>{part}</a>
    //       );
    //     }
    //     return <span key={index.toString()} >{part}</span>; // Preserve non-matched parts
    //   });
    // }
  };

function LinkExtractor({ text }: { text:string }) {
    const extractLinks = (text: string) => {
      const regex = /(https?:\/\/[^\s]+)/g;
      return text.match(regex) || [];
    };
  
    const links = extractLinks(text);
  
    return (
      <div>
        {links.map((link, index) => (
          <CustomText fontFamily={'DM-Regular'} fontSize={'15px'} key={index.toString()}>
            <a key={index} href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
          </CustomText>
        ))}
      </div>
    );
  }
  
  export default LinkExtractor;
  