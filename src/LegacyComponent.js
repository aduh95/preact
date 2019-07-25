import { assign } from './util';
import { Component, enqueueRender } from './Component';

export function LegacyComponent(p, c){
	Object.defineProperty(this, 'state', stateDescriptor);
	Component.call(this, p, c);
}

LegacyComponent.prototype = new Component();

const stateDescriptor = {
	get() {
		return this._nextState || this._state;
	},
	set(newState) {
		this._state = newState;
	}
};

/**
 * Update component state and schedule a re-render.
 * @param {object | ((s: object, p: object) => object)} update A hash of state
 * properties to update with new values or a function that given the current
 * state and props returns a new partial state
 * @param {() => void} [callback] A function to be called once component state is
 * updated
 */
// TODO: can we remove this now?
LegacyComponent.prototype.setState = function(update, callback) {
	if (!this.prevState) this.prevState = this.state;
	this.state = this._nextState = assign(
		assign({}, this.state),
		typeof state === 'function' ? update(this.state, this.props) : update
	);
	if (callback) this._renderCallbacks.push(callback);
	enqueueRender(this);
};

