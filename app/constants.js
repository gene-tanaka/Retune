export const users = [
    {
        id: 1,
        username: 'sophiejin',
        firstName: 'Sophie',
        lastName: 'Jin',
        description: 'Hi! I’m Sophie and I’m a grad student at Stanford. Talk to me about K-indie, city pop, or hip-hop!',
        followingUserIds: [2, 3],
        followedUserIds: [2, 3],
    },
    {
        id: 2,
        username: 'jennylee',
        firstName: 'Jenny',
        lastName: 'Lee',
        description: 'Hi! I’m Jenny and I’m a senior at Stanford. Talk to me about K-indie, city pop, or hip-hop!',
        followingUserIds: [1, 3],
        followedUserIds: [1, 3],
    },
    {
        id: 3,
        username: 'ethankim',
        firstName: 'Ethan',
        lastName: 'Kim',
        description: 'Hi! I’m Ethan and I’m a junior at Stanford. Talk to me about K-indie, city pop, or hip-hop!',
        followingUserIds: [1, 2],
        followedUserIds: [1, 2],
    },
]
