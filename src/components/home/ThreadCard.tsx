/* eslint-disable react/display-name */
import { IMediaPost } from '@/models/MediaPost';
import { VStack } from '@chakra-ui/react';
import React from 'react'

interface IProps {
    post?: IMediaPost;
}

const ThreadCard = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
    
    return (
      <VStack width={'100%'} height={'400px'} bg='white' borderBottomLeftRadius={'20px'} borderBottomRightRadius={'20px'} borderTopLeftRadius={'20px'} borderWidth='1px' borderColor={'lightgrey'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni maiores debitis natus eos. Adipisci, exercitationem voluptas eius maxime est officia possimus impedit explicabo odio ex nulla commodi fugit dolorum reiciendis culpa nesciunt mollitia distinctio facere tenetur! Expedita, atque ratione voluptates doloribus ipsum esse magnam illum optio iste quaerat unde aliquid in odio, cum veniam aspernatur repellendus vero, deleniti quos odit sequi? Ut temporibus voluptatibus eveniet, adipisci tempore corporis iure. Iure eaque provident magnam minus assumenda? Illum quasi dolore mollitia corrupti sit molestiae consequatur, possimus ratione in fuga nobis reiciendis laboriosam, molestias sunt laudantium vero ad consequuntur. At molestiae vitae, nam ducimus velit similique veniam reiciendis rem in deleniti molestias mollitia maiores assumenda. Molestiae nulla officia inventore magnam dolore voluptatum provident, qui odit natus dolorum tenetur necessitatibus cupiditate, perspiciatis neque hic ratione, harum tempore ipsam. Assumenda sapiente itaque laborum nam, recusandae temporibus quasi ullam, velit harum eaque excepturi quod rem distinctio vero sed perferendis fugit debitis ex perspiciatis quia voluptates? Laborum neque placeat odio. Natus nesciunt debitis at tenetur incidunt porro possimus distinctio, aut, est atque laudantium blanditiis minus modi laboriosam iusto! Quia ut incidunt alias aliquam, natus blanditiis vero provident nesciunt doloribus quo atque minima eum iusto suscipit, magnam voluptas mollitia facere quasi pariatur illo, molestiae eos laudantium itaque asperiores. Eius obcaecati harum, vel debitis odio consectetur. Eaque nostrum, provident autem fugit iste nisi doloribus magnam quisquam? Animi quidem quae, iste eaque obcaecati nesciunt vel repellendus numquam odio eveniet distinctio eos magni voluptatum alias doloremque qui necessitatibus similique laudantium, consequuntur ipsum officia reiciendis, libero provident. Quidem fugit ducimus ratione qui ex voluptate, accusamus possimus animi. Facere exercitationem non, reiciendis laboriosam dolor eveniet eligendi aspernatur aut quas, autem aliquam deleniti provident assumenda blanditiis illo molestias tempore. Repellat officiis rerum doloribus eveniet temporibus? Reiciendis quidem, provident labore repellat optio nemo hic eius.
      </VStack>
    );
  });
export default ThreadCard