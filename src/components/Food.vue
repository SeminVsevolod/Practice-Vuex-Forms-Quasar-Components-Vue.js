<template>
	<q-card
		class="card">
    <q-img
      :src="food.imageUrl || 'statics/image-placeholder.png'"
      placeholder-src="statics/image-placeholder.png"
      basic
      contain
      absolute-full
    >
      <template #loading>
        <div class="absolute-full flex flex-center text-subtitle1 text-white">
          Loading...
        </div>
      </template>
      <div class="absolute-bottom text-h6">
        {{ food.name }}
      </div>
      <template #error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          Cannot load image
        </div>
      </template>
    </q-img>

		<q-card-section>
      <q-rating
        :value="food.rating"
        size="2em"
        color="orange"
        readonly
        class="q-mt-sm"
      />
    </q-card-section>

    <q-card-section >
      <template v-if="food.description && food.description.length">
        {{ food.description }}
      </template>
      <i v-else>No description provided.</i>
    </q-card-section>

    <q-card-actions
    	class="absolute-bottom"
    	align="right">
      <q-btn
      	@click="showEditFoodModal = true"
      	icon="edit"
      	color="blue"
      	flat>Edit</q-btn>
      <q-btn
      	icon="delete"
      	color="red"
        @click.stop="showConfirmToDelete = true"
      	flat>Delete</q-btn>
    </q-card-actions>

    <q-dialog
    	v-model="showEditFoodModal">
      <modal-add-edit-food
        mode="edit"
        :food="food"
        @close="showEditFoodModal = false"
      />
    </q-dialog>

    <q-dialog
      v-model="showConfirmToDelete"
      persistent
    >
      <q-card style="width: 300px">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Really delete?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Delete"
            color="red"
            @click="deleteFood({id: food.id})"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
  import {mapActions} from 'vuex';
	export default {
    components: {
      'modal-add-edit-food' : require('components/ModalAddEditFood.vue').default
    },

		props: ['food'],

		data() {
			return {
				showEditFoodModal: false,
        showConfirmToDelete: false,
			}
		},

    methods: {
      ...mapActions('foods', [
        'updateFood',
        'deleteFood',
      ]),
    },
	}
</script>

<style>
	.card {
		min-height: 400px;
		max-width: 250px;
		width: 250px;
		transition: background 0.3s;
	}
	.card-clickable {
		cursor: pointer;
	}
	.card-clickable:hover {
		background: #bdbdbd!important;
	}
	.card .q-img {
		max-height: 180px;
	}
	.card .q-img__image {
		background-size: cover !important;
	}
	.card .q-rating__icon {
		opacity: 0.2;
	}
	.card .q-rating__icon--active {
		opacity: 1;
	}
</style>
