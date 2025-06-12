// "use client";
// import React, { FC, useState } from "react";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// type SelectScoreProps = {
//     selectPlaceholder: string;
//     onScore: (score: string) => void;
// };

// const SelectScore: FC<SelectScoreProps> = ({ selectPlaceholder, onScore }) => {
//     return (
//         <Select onValueChange={onScore}>
//             <SelectTrigger>
//                 <SelectValue placeholder={selectPlaceholder} />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectItem value="0">0</SelectItem>
//                 <SelectItem value="1">1</SelectItem>
//                 <SelectItem value="2">2</SelectItem>
//                 <SelectItem value="3">3</SelectItem>
//                 <SelectItem value="4">4</SelectItem>
//                 <SelectItem value="5">5</SelectItem>
//                 <SelectItem value="6">6</SelectItem>
//                 <SelectItem value="7">7</SelectItem>
//                 <SelectItem value="8">8</SelectItem>
//                 <SelectItem value="9">9</SelectItem>
//                 <SelectItem value="10">10</SelectItem>
//                 <SelectItem value="11">11</SelectItem>
//             </SelectContent>
//         </Select>
//     );
// };

// export default SelectScore;
