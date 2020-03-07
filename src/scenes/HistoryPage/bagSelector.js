import React, {
  useEffect, useState
 } from 'react';
 import Autosuggest from 'react-autosuggest';
 import { useDispatch } from 'react-redux';
 import { fetchBagTypes } from '../../actions/bagTypeActions';
 
 import useBagTypes from './useBagTypes';
 
 import API from '../../_config/axios';

 export default function BagSelector(props) {
   const [value, setValue] = useState('');
   const [selectedBag, setSelectedBag] = useState({});
   const bagTypes = useBagTypes();
   const dispatch = useDispatch();
   const { seriesId } = props;
   const { bagId } = props;
   const { updateSeriesData } = props;
 
   useEffect(() => {
     if (!bagTypes.length > 0) {
       dispatch(fetchBagTypes());
     }
   });
 
   const onChange = (event, { newValue }) => {
     console.log(newValue);
     setValue(newValue);
   };
 
   function renderSuggestion(suggestion) {
     return (
       <span>
         {suggestion.type}
         {' '}
         {suggestion.volume}
         {'ML'}
         {suggestion.dosage}
         {'%'}
       </span>
     );
   }
 
   function onSuggestionSelected(event, { suggestion }) {
     // Zwraca obiekt
     console.log(suggestion);
     setSelectedBag(suggestion);
   }
 
   const getBagName = () => {
     console.log(bagTypes);
     console.log(bagId);
     if (bagId !== undefined) {
       const bagType = bagTypes.filter((bagType) => bagType._id === bagId)[0];
       if (bagType !== undefined) {
        return `${bagType.type} | ${bagType.volume}ML ${bagType.dosage}%`;
       }
     }
 
     return 'Select bag type...';
   };
 
   const inputProps = {
     placeholder: getBagName(),
     value,
     onChange,
   };
 
   function getSuggestionValue(suggestion) {
     return `${suggestion.type} | ${suggestion.volume}ML ${suggestion.dosage}%`;
   }
 
   function onSuggestionsClearRequested() {
     console.log('onSuggestionsClearRequested');
   }
 
   function onSuggestionsFetchRequested({ value }) {
     console.log(value);
   }
 
   const onButtonClick = () => {
     // input.current.focus();
     console.log('XD');
     // dispatch update if selectedBag exists
     console.log(selectedBag);
    if (selectedBag !== {}) {
      const updateSeries = async () => {
        API.put('http://localhost:1200/singleSeries', {
          seriesId,
          bagType: selectedBag._id,
        }).then((res) => {
          console.log(res);
          // updateSeriesData(res);
          // Callback do zmiany XD
          updateSeriesData(res.data);
        });
      };
      updateSeries();
    }
   };
 
   return (
     <div className="bag-selector">
       {bagTypes.length > 0 && (
         <Autosuggest 
           suggestions={bagTypes}
           getSuggestionValue={getSuggestionValue}
           renderSuggestion={renderSuggestion}
           onSuggestionsFetchRequested={onSuggestionsFetchRequested}
           onSuggestionsClearRequested={onSuggestionsClearRequested}
           inputProps={inputProps}
           onSuggestionSelected={onSuggestionSelected}
         />
       )}
       <button type="button" onClick={onButtonClick}>Apply</button>
     </div>
   );
 }
