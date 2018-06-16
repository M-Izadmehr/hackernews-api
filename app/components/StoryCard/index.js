import React from 'react';
import propTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import CardData from './CardData';
import './style.scss';

class StoryCard extends React.PureComponent {

  state = { open: false, isVisible: false };

  shouldComponentUpdate(nextState) {
    const shouldUpdate = [];
    shouldUpdate.push(nextState.open !== this.state.open); // check if card isOpen has changed
    shouldUpdate.push(nextState.isVisible !== this.state.isVisible); // check if card isVisible has changed
    return shouldUpdate.some((item) => item);
  }


  handleResize = () => {
    const { open } = this.state;
    this.setState({ open: !open }); // eslint-disable-line
  };

  handleVisibilityChange = (isVisible) => {
    // set the new visibility state
    this.setState({ isVisible });
  };


  render() {
    const { open, isVisible } = this.state;
    const { id, getDetailsByCard } = this.props;

    return (
      <div
        role="button"
        tabIndex="0"
        className={`comp-storyCard ${open ? 'open' : ''}`} // TODO handle the .has-data class style
        onClick={this.handleResize}
      >
        <VisibilitySensor partialVisibility onChange={this.handleVisibilityChange} >
          <div className="data-container">
            {isVisible && <CardData
              id={id}
              open={open}
              isVisible={isVisible}
              getDetailsByCard={getDetailsByCard}
            />}
            <div className="vis-item" />
          </div>
        </VisibilitySensor>
      </div>
    );
  }
}

StoryCard.propTypes = {
  id: propTypes.number.isRequired,
  getDetailsByCard: propTypes.bool.isRequired,
};


export default StoryCard;
