import {
  PostgrestFilterBuilder,
  PostgrestQueryBuilder,
} from "@supabase/postgrest-js";
import { createClient, Provider, SupabaseClient } from "@supabase/supabase-js";
import EventContainer from "../event/EventContainer.js";

class Supabase extends EventContainer {
  public client!: SupabaseClient;
  public devMode: boolean = false;

  public connect(supabaseUrl: string, supabaseKey: string, devMode: boolean) {
    this.devMode = devMode;
    this.client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
    });
  }

  public async signIn(provider: Provider) {
    await this.client.auth.signInWithOAuth({
      provider,
      options: this.devMode
        ? { redirectTo: "http://localhost:8413/" }
        : undefined,
    });
  }

  public async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  private convertNullToUndefined(obj: any) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        obj[key] = undefined;
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        this.convertNullToUndefined(obj[key]);
      }
    });
  }

  public async safeFetch(
    tableName: string,
    build: (
      builder: PostgrestQueryBuilder<any, any, unknown>,
    ) => PostgrestFilterBuilder<any, any, any, unknown>,
  ) {
    const { data, error } = await build(this.client.from(tableName));
    if (error) throw error;
    if (data) {
      if (Array.isArray(data)) {
        data.forEach((obj) => this.convertNullToUndefined(obj));
      } else {
        this.convertNullToUndefined(data);
      }
    }
    return data;
  }
}

export default new Supabase();