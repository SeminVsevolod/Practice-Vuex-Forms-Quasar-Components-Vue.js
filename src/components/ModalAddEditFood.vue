<template>
	<q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ mode }} Food</div>
    </q-card-section>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <div class="row q-mb-md">
          <q-input
            filled
            v-model="foodToSubmit.name"
            label="Name (e.g. Burger)"
            :rules="[val => !!val || 'Field is required', val => val.length <= 20 || 'Please use maximum 20 characters']"
            :lazy-rules="true"
            class="col" />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="foodToSubmit.description"
            label="Description"
            type="textarea"
            :rules="[val => val.length <= 135 || 'Please use maximum 135 characters']"
            :lazy-rules="true"
            class="col" />
        </div>

        <div class="row q-mb-md">
          <q-input
            filled
            v-model="foodToSubmit.imageUrl"
            label="Image URL"
            class="col" />
          <q-img
            :src="foodToSubmit.imageUrl ? foodToSubmit.imageUrl : 'statics/image-placeholder.png'"
            class="q-ml-sm"
            contain />
        </div>

        <div class="q-mb-md">
          <div class="row">
            <p class="q-mb-none">Rating:</p>
          </div>
          <div class="row">
            <q-rating
              v-model="foodToSubmit.rating"
              size="2em"
              color="orange" />
          </div>
        </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          color="grey"
          v-close-popup />
        <q-btn
          label="Save"
          color="primary"
          type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
  import { mapActions } from 'vuex';
	export default {
		props: {
		  mode: {
		    type: String,
        required: true,
        validator: function (value) {
          return ['add', 'edit'].includes(value);
        },
		  },
      food: {
		    type: Object,
      }
    },
		data() {
			return {
				foodToSubmit: {
					name: '',
					description: '',
					rating: 1,
					imageUrl: ''
				}
			}
		},
    mounted() {
      if (this.mode === 'edit') {
        if (!this.food || !this.food.id) {
          throw new Error('In "edit" mode "food" is required');
        }
        this.foodToSubmit = {...this.food};
      }
    },
    methods: {
      ...mapActions('foods', [
        'updateFood', 'addFood'
      ]),
      submitForm() {
        if (this.mode === 'edit') {
          this.updateFood({
            id: this.food.id,
            updates: this.foodToSubmit,
          });
        }
        if (this.mode === 'add') {
          this.addFood(this.foodToSubmit);
        }
        this.$emit('close');
      },
    }
	}
</script>

<style>
	.form-card {
		min-width: 400px;
	}
	.form-card .heading {
		text-transform: capitalize;
	}
	.form-card .q-card-section {
		width: 100%;
	}
	.thumbnail {
		max-width: 50px;
		max-height: 50px;
	}
	.form-card .q-img {
		height: 56px;
		width: 56px;
		border-radius: 10px;
	}
	.form-card .q-img__image {
		background-size: cover !important;
	}
	.form-card .q-rating__icon {
		opacity: 0.2;
	}
	.form-card .q-rating__icon--active {
		opacity: 1;
	}
</style>
