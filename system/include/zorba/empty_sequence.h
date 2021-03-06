/*
 * Copyright 2006-2016 zorba.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#ifndef ZORBA_EMPTY_ITEM_SEQUENCE_API_H
#define ZORBA_EMPTY_ITEM_SEQUENCE_API_H

#include <zorba/config.h>
#include <zorba/item_sequence.h>
#include <zorba/item.h>
#include <zorba/iterator.h>

namespace zorba { 

/**
 * \brief This class is an implementation of the ItemSequence.
 *        Objects of this class represent the empty sequence.
 *
 * See ItemSequence
 */
class ZORBA_DLL_PUBLIC EmptySequence : public ItemSequence
{
  /**
   * \brief Implements an iterator over the empty sequence.
   * Assuming that the iterator is in the open state, its next() method will
   * always return false.
   *
   * See Iterator.
   */
  class InternalIterator : public Iterator
  {
  private:
    ItemSequence  * theItemSequence;
    bool            theIsOpen;

  public:
    InternalIterator(ItemSequence* seq);

    virtual void open();

    virtual bool next(Item& aItem);

    virtual void close();

    virtual bool isOpen() const;
  };

 public:
  EmptySequence() { }

  virtual ~EmptySequence() { }
  
  virtual Iterator_t getIterator();
  
}; /* class EmptySequence */

} // namespace zorba

#endif /* ZORBA_EMPTY_SEQUENCE_API_H */
/* vim:set et sw=2 ts=2: */
