<template>
	<q-card
		class="card">
    <q-img
      :src="food.imageUrl"
      basic
      contain
    >
      <div class="absolute-bottom text-h6">
        {{ food.name }}
      </div>
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

    <q-card-section>
      {{ food.description }}
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
      <modal-add-edit-food type="edit" />
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
