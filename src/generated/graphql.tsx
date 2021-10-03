import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Beat = {
  __typename?: 'Beat';
  bpm?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  creator: User;
  creatorId: Scalars['Int'];
  genre?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  likes: Array<Like>;
  likesCount: Scalars['Int'];
  tags?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type BeatResponse = {
  __typename?: 'BeatResponse';
  beat?: Maybe<Beat>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateBeatInput = {
  bpm?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type ErrorsOrValidResponse = {
  __typename?: 'ErrorsOrValidResponse';
  error?: Maybe<FieldError>;
  valid?: Maybe<Scalars['Boolean']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  beat: Beat;
  beatId: Scalars['Int'];
  user: User;
  userId: Scalars['Int'];
};

export type LoginUserInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createBeat: BeatResponse;
  createPost: Post;
  deleteBeat: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  forgotPasswordDev: Scalars['Boolean'];
  likeBeat: ErrorsOrValidResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  removeUser: Scalars['Boolean'];
  updateBeat?: Maybe<Beat>;
  updatePost?: Maybe<Post>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateBeatArgs = {
  options: CreateBeatInput;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationDeleteBeatArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordDevArgs = {
  email: Scalars['String'];
};


export type MutationLikeBeatArgs = {
  beatId: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: LoginUserInput;
};


export type MutationRegisterArgs = {
  options: RegisterUserInput;
};


export type MutationRemoveUserArgs = {
  userId: Scalars['Float'];
};


export type MutationUpdateBeatArgs = {
  options: UpdateBeatInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type PaginatedBeatsResponse = {
  __typename?: 'PaginatedBeatsResponse';
  beats: Array<Beat>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  beat?: Maybe<Beat>;
  beats: PaginatedBeatsResponse;
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryBeatArgs = {
  id: Scalars['Int'];
};


export type QueryBeatsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  location?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateBeatInput = {
  bpm?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  beats: Array<Beat>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  likes: Array<Like>;
  location: Scalars['String'];
  updatedAt: Scalars['String'];
  userName: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ErrorSimpleFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserResponseSimpleFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, userName: string }> };

export type UserSimpleFragment = { __typename?: 'User', id: number, userName: string };

export type CreateBeatMutationVariables = Exact<{
  options: CreateBeatInput;
}>;


export type CreateBeatMutation = { __typename?: 'Mutation', createBeat: { __typename?: 'BeatResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, beat?: Maybe<{ __typename?: 'Beat', id: number, title: string, bpm?: Maybe<number>, key?: Maybe<string>, genre?: Maybe<string>, createdAt: string, updatedAt: string }> } };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, title: string } };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, userName: string }> } };

export type ForgotPasswordDevMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordDevMutation = { __typename?: 'Mutation', forgotPasswordDev: boolean };

export type LoginMutationVariables = Exact<{
  options: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, userName: string }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: RegisterUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, userName: string }> } };

export type BeatsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
}>;


export type BeatsQuery = { __typename?: 'Query', beats: { __typename?: 'PaginatedBeatsResponse', hasMore: boolean, beats: Array<{ __typename?: 'Beat', id: number, title: string, genre?: Maybe<string>, bpm?: Maybe<number>, key?: Maybe<string>, tags?: Maybe<string>, createdAt: string, updatedAt: string, creator: { __typename?: 'User', id: number, userName: string } }> } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, title: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, userName: string }> };

export const ErrorSimpleFragmentDoc = gql`
    fragment ErrorSimple on FieldError {
  field
  message
}
    `;
export const UserSimpleFragmentDoc = gql`
    fragment UserSimple on User {
  id
  userName
}
    `;
export const UserResponseSimpleFragmentDoc = gql`
    fragment UserResponseSimple on UserResponse {
  errors {
    ...ErrorSimple
  }
  user {
    ...UserSimple
  }
}
    ${ErrorSimpleFragmentDoc}
${UserSimpleFragmentDoc}`;
export const CreateBeatDocument = gql`
    mutation CreateBeat($options: CreateBeatInput!) {
  createBeat(options: $options) {
    errors {
      field
      message
    }
    beat {
      id
      title
      bpm
      key
      genre
      createdAt
      updatedAt
    }
  }
}
    `;

export function useCreateBeatMutation() {
  return Urql.useMutation<CreateBeatMutation, CreateBeatMutationVariables>(CreateBeatDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!) {
  createPost(title: $title) {
    id
    title
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponseSimple
  }
}
    ${UserResponseSimpleFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgotPasswordDevDocument = gql`
    mutation ForgotPasswordDev($email: String!) {
  forgotPasswordDev(email: $email)
}
    `;

export function useForgotPasswordDevMutation() {
  return Urql.useMutation<ForgotPasswordDevMutation, ForgotPasswordDevMutationVariables>(ForgotPasswordDevDocument);
};
export const LoginDocument = gql`
    mutation Login($options: LoginUserInput!) {
  login(options: $options) {
    ...UserResponseSimple
  }
}
    ${UserResponseSimpleFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: RegisterUserInput!) {
  register(options: $options) {
    ...UserResponseSimple
  }
}
    ${UserResponseSimpleFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const BeatsDocument = gql`
    query Beats($limit: Int, $cursor: String) {
  beats(limit: $limit, cursor: $cursor) {
    hasMore
    beats {
      id
      title
      genre
      bpm
      key
      tags
      creator {
        id
        userName
      }
      createdAt
      updatedAt
    }
  }
}
    `;

export function useBeatsQuery(options: Omit<Urql.UseQueryArgs<BeatsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BeatsQuery>({ query: BeatsDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    title
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserSimple
  }
}
    ${UserSimpleFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};