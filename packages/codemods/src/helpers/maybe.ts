import { Chainable, Flattened } from './chainable';

interface MaybeChain<T> extends Chainable<T> {
  something?: boolean;
  __isMaybe: true;
  fmap: <ReturnType>(this: Maybe<T>, fn: (v: NonNullable<T>) => NonNullable<ReturnType>) => Maybe<ReturnType>;
  chain: <ReturnType>(this: Maybe<T>, fn: (v: NonNullable<T>) => Maybe<ReturnType>) => Maybe<ReturnType>;
  flatten: () => Flattened<T, Maybe<T>>;
  then: <ReturnType>(this: Maybe<T>, fn: (v: NonNullable<T>) => ReturnType | Maybe<ReturnType>) => Maybe<ReturnType>;
  orElse: (mElse: NonNullable<T>) => NonNullable<T>;
}
export interface Something<T> extends MaybeChain<T> {
  something: true;
  value: NonNullable<T>;
}
export interface Nothing<T> extends MaybeChain<T> {
  something: false;
}

class MB<T> implements MaybeChain<T> {
  public something: boolean;
  public value: T | undefined;
  public __isMaybe: true = true;

  public fmap<ReturnType>(this: Maybe<T>, fn: (v: NonNullable<T>) => NonNullable<ReturnType>): Maybe<ReturnType> {
    return this.something ? Something(fn(this.value)) : Nothing();
  }

  public chain<R>(this: Maybe<T>, fn: (v: NonNullable<T>) => Maybe<R>): Maybe<R> {
    return this.something ? fn(this.value) : Nothing();
  }

  public flatten() {
    if (this.something) {
      const val = this.value;
      if (typeof val === 'object' && '__isMaybe' in val) {
        return val as Flattened<T, Maybe<T>>;
      }
    }
    // Rewrap the value in a maybe so there is a new object
    return Maybe(this.value) as Flattened<T, Maybe<T>>;
  }

  public then<F>(this: Maybe<T>, fn: (v: NonNullable<T>) => F | Maybe<F>): Maybe<F> {
    return this.chain(v => Maybe(fn(v))).flatten() as Maybe<F>;
  }

  public orElse(mElse: NonNullable<T>): NonNullable<T> {
    return this.something ? this.value! : mElse;
  }
}

export type Maybe<T> = Nothing<T> | Something<T>;

const makeMaybe = <F>(): MaybeChain<F> => {
  return new MB<F>();
};
// Need to use assign so that the object remains correctly bound to the methods.
export const Nothing = <T>(): Nothing<T> => {
  return Object.assign<MaybeChain<T>, { something: false }>(makeMaybe<T>(), { something: false });
};

export const Something = <T>(value: NonNullable<T>): Something<T> => {
  if (value === undefined || value === null) {
    throw new Error('Maybe.Just cannot be undefined or null');
  }
  return Object.assign<MaybeChain<T>, { something: true; value: NonNullable<T> }>(makeMaybe<T>(), {
    something: true,
    value: value,
  });
};

export const Maybe = <T>(value: T | undefined | null): Maybe<T> => {
  return value !== undefined && value !== null ? Something(value!) : Nothing();
};
