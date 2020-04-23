import { connect } from 'react-redux'
import { Settings } from '../components/profile/Settings'

const mapStateToProps = state => {
    return {student: state.api.user};
};

const mapDispatchToProps = dispatch => {
    return {};
};

let SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings);

export default SettingsContainer;
