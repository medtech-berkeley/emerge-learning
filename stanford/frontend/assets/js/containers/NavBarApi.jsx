import { connect } from 'react-redux'
import { refreshStudent } from '../actions/LoadUserActions'
import { NavBar } from '../components/NavBar';

const mapStateToProps = state => {
    return {'user': state.api.user, 'page': state.ui.page};
};

const mapDispatchToProps = dispatch => {
    return {
    	refreshStudent: () => dispatch(refreshStudent()),
    };
};

let NavBarApi = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarApi;