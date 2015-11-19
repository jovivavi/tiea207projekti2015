import alt from '../alt';

class HomeActions {
	constructor() {
		this.generateActions(
			'getTitlesSuccess',
			'getTitlesFail',
			'handleSort'
		);
	}

	handleSort() {
		this.actions.handleSort();
	}

	getTitles() {
		//Tehty json generaattorilla
		$.ajax({ url: '/api/titles/all'})
		 .done((data) => {
		 	this.actions.getTitlesSuccess(data)
		 })
		 .fail((jqXhr) => {
		 	this.actions.getTitlesFail(jqXhr)
		 });
	}
}

export default alt.createActions(HomeActions);
