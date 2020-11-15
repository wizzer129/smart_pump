import React from 'react';
import Media from 'react-bootstrap/Media';
import PropTypes from 'prop-types';

const UserProfileKeys = [
    {
        key: 'email',
        title: 'Email',
    },
    { key: 'address', title: 'Address' },
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'eyeColor', title: 'Eye Color' },
];

const UserProfileMediaBody = ({ title, description }) => {
    return (
        <Media.Body>
            <b>{`${title}:`}</b>
            <p>{description}</p>
        </Media.Body>
    );
};

const UserProfileMedia = ({ user }) => {
    return (
        <ul className="list-unstyled">
            {UserProfileKeys.map((item) => (
                <Media as="li" key={`${item.title} ${user[item.value]} `}>
                    <UserProfileMediaBody title={item.title} description={user[item.key]} />
                </Media>
            ))}
        </ul>
    );
};

UserProfileMedia.propTypes = {
    user: PropTypes.object,
};

export default UserProfileMedia;
