import type { MaybeRefOrGetter, Ref } from 'vue';

export function useCategoryFilter<T extends { category: string }>(
  items: MaybeRefOrGetter<readonly T[]>,
  activeCategory: Ref<string>,
  allCategory = 'All'
) {
  return computed(() => {
    const sourceItems = toValue(items);
    return activeCategory.value === allCategory
      ? sourceItems
      : sourceItems.filter((item) => item.category === activeCategory.value);
  });
}
