package com.example;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.shell.MainReactPackage;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        interceptNetwork();
    }

    private void interceptNetwork() {
        Interceptor interceptor = new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                handleRequest(chain.request());
                return chain.proceed(chain.request());
            }
        };
        OkHttpClient client = OkHttpClientProvider.getOkHttpClient();
        OkHttpClient newClient = client.newBuilder().addInterceptor(interceptor).build();
        OkHttpClientProvider.replaceOkHttpClient(newClient);
    }

    private void handleRequest(Request request) {
        RCTNativeAppEventEmitter eventEmitter = mReactNativeHost.getReactInstanceManager().getCurrentReactContext().getJSModule(RCTNativeAppEventEmitter.class);
        WritableMap data = Arguments.createMap();
        data.putString("url", request.url().toString());
        data.putString("method", request.method());
        eventEmitter.emit("NetworkInterceptor", data);
    }
}
