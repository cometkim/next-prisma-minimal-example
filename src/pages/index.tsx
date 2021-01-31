import * as React from 'react';
import { PrismaClient } from 'generated/client';

export default function IndexPage({ allUsers }) {
  return (
    <table>
      <thead>
        <caption>Welcome to Next.js!</caption>
      </thead>
      <tbody>
      <tr>
        <th>id</th>
        <th>email</th>
        <th>name</th>
      </tr>
      {allUsers.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.name}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export async function getStaticProps(context) {
  const prisma = new PrismaClient()

  const allUsers = await prisma.user.findMany({
    include: { posts: true },
  });

  return {
    props: {
      allUsers,
    },
  };
}
