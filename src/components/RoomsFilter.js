import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';
// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
  // react hooks
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    statecode
  } = context;


  // get unique states
  let statecodes = getUnique(rooms, 'statecode');
  // add all
  statecodes = ['all', ...statecodes];
  // map to jsx
  statecodes = statecodes.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  // get unique types
  let types = getUnique(rooms, 'type');
  // add all
  types = ['all', ...types];
  // map to jsx
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  // get maximum capacity
  let maxCap = Math.max(...rooms.map(item => item.capacity));
  //create an ordered array from minimum to maximum
  let p;
  if (maxCap !== -Infinity){
    p = [...Array(maxCap+1).keys()]
  } else {
    p = []
  }
  let people;
  if (p.length > 0) {
    people = p.slice(1)
  } else {
    people = []
  }
  people = people.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select state */}
        <div className="form-group">
          <label htmlFor="statecode">state</label>
          <select
            name="statecode"
            id="statecode"
            onChange={handleChange}
            className="form-control"
            value={statecode}
          >
            {statecodes}
          </select>
        </div>
        {/* end of select state */}
        {/* select type */}
        <div className="form-group">
          <label htmlFor="type">house type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            {types}
          </select>
        </div>
        {/* end of select type */}
        {/* guests  */}
        <div className="form-group">
          <label htmlFor="capacity">bedrooms</label>
          <select
            name="capacity"
            id="capacity"
            onChange={handleChange}
            className="form-control"
            value={capacity}
          >
            {people}
          </select>
        </div>
        {/* end of guests */}
        {/* house price */}
        <div className="form-group">
          <label htmlFor="price">max price: ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* end of house price*/}
        {/* size */}
        <div className="form-group">
          <label htmlFor="price">house area</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* end of select type */}
        {/* extras
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              name="airconditioning"
              id="airconditioning"
              checked={airconditioning}
              onChange={handleChange}
            />
            <label htmlFor="airconditioning">airconditioning</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              name="garden"
              checked={garden}
              onChange={handleChange}
            />
            <label htmlFor="airconditioning">garden</label>
          </div>
        </div>
        end of extras type */}
      </form>
    </section>
  );
};

export default RoomsFilter;
